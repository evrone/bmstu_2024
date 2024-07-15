# syntax = docker/dockerfile:1

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=3.2.4
FROM registry.docker.com/library/ruby:$RUBY_VERSION-alpine as base

# Rails app lives here
WORKDIR /rails

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

# Throw-away build stage to reduce size of final image
FROM base as build

RUN apk add --no-cache --virtual .build-deps build-base git postgresql-dev vips-dev tzdata yarn nodejs-current npm

RUN apk add --no-cache curl vips-dev postgresql-client tzdata
RUN rm -rf /var/lib/apt/lists /var/cache/apt/archives

RUN npm install -g yarn@latest

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install
RUN rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git
RUN bundle exec bootsnap precompile --gemfile

# Install node modules
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy application code
COPY . .

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/

# Precompiling assets for production without requiring secret RAILS_MASTER_KEY
RUN ./bin/rails assets:precompile

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apk add --no-cache --virtual .build-deps curl build-base postgresql-dev vips-dev tzdata
RUN rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built artifacts: gems, application
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

# Run and own only the runtime files as a non-root user for security
RUN adduser -D rails --shell /bin/bash
RUN mkdir -p /usr/local/bundle/ruby/3.2.0/cache
RUN chown -R rails:rails db log storage tmp /usr/local/bundle/ruby/3.2.0/cache
RUN chmod -R 777 /usr/local/bundle/ruby/3.2.0/cache
USER rails:rails

# Entrypoint prepares the database.
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["./bin/rails", "server"]
