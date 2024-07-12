SHELL=/bin/sh

UID := $(shell id -u)
GID := $(shell id -g)

setup: build db-prepare

build:
	bundle install
	yarn install
	docker compose build

up:
	docker compose up

clear:
	docker compose down -v --rmi all

creds:
	EDITOR='code --wait' bin/rails credentials:edit

ash:
	docker compose run --rm app ash

console:
	docker compose run --rm app bundle exec rails c

yarn:
	docker-compose run --rm app yarn install

bundle:
	docker-compose run --rm app bundle install

db-psql:
	docker compose run --rm app psql -d APPLICATION_NAME_development -U postgres -W -h db

db-prepare: db-drop db-create db-migrate db-seed

db-create:
	docker compose run --rm app bin/rails db:create RAILS_ENV=development

db-migrate:
	docker compose run --rm app bin/rails db:migrate

db-rollback:
	docker compose run --rm app bin/rails db:rollback

db-seed:
	docker compose run --rm app bin/rails db:seed

db-reset:
	docker compose run --rm app bin/rails db:reset

db-drop:
	docker compose run --rm app bin/rails db:drop
