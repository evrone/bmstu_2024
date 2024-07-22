# syntax = docker/dockerfile:1

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=3.2.4
FROM registry.docker.com/library/ruby:$RUBY_VERSION-alpine AS base

# Rails app lives here
WORKDIR /rails

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development" \
    NODE_PATH="/node_modules"

FROM base AS node

# Install node modules
RUN apk add --virtual .build-deps yarn
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --modules-folder $NODE_PATH

# Throw-away build stage to reduce size of final image
FROM base AS build

WORKDIR /rails

RUN apk add --no-cache --virtual .build-deps build-base git postgresql-dev vips-dev tzdata pkgconfig && \
    apk add --no-cache curl vips-dev postgresql-client tzdata && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy application code
COPY . .

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/

# Precompiling assets for production without requiring secret RAILS_MASTER_KEY
COPY --from=node /node_modules /node_modules
RUN apk add --virtual .build-deps yarn
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

# Final stage for app image
FROM base

WORKDIR /rails

# Copy built artifacts: gems, application
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

# Install packages needed for deployment
RUN apk add --no-cache --virtual .build-deps curl build-base postgresql-dev vips-dev tzdata yarn && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy node build artifacts
COPY --from=node /node_modules /node_modules
RUN yarn global add nodemon sass postcss-cli --prefix /usr/local

# Run and own only the runtime files as a non-root user for security
RUN adduser -D rails --shell /bin/ash
RUN mkdir -p /usr/local/bundle/ruby/3.2.0/cache
RUN chown -R rails:rails db log storage tmp /usr/local/bundle/ruby/3.2.0/cache
RUN chmod -R 777 /usr/local/bundle/ruby/3.2.0/cache
USER rails:rails

# Entrypoint prepares the database.
ENTRYPOINT ["./bin/docker-entrypoint"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["./bin/rails", "server"]
