SHELL=/bin/sh

UID := $(shell id -u)
GID := $(shell id -g)

include .env
export

setup: build db-prepare

build:
	bundle lock --update
	npm install --package-lock-only 
	sudo docker compose build

up:
	sudo docker compose up

down:
	sudo docker compose down

clear:
	sudo docker compose down -v --rmi all

creds:
	EDITOR='code --wait' bin/rails credentials:edit

ash:
	sudo docker compose run --rm app ash

console:
	sudo docker compose run --rm app bundle exec rails c

yarn:
	sudo docker compose run --rm app yarn install

bundle:
	sudo docker compose run --rm app bundle install

rubocop:
	sudo docker compose run --rm app bundle exec rubocop --config /rails/config/rubocop.yml

rubocop-verbose:
	sudo docker compose run --rm app bundle exec rubocop

rubocopA:
	sudo docker compose run --rm app bundle exec rubocop --config /rails/config/rubocop.yml -A

db-psql:
	sudo docker compose run --rm app psql -d ${POSTGRES_DB} -U ${POSTGRES_USER} -W -h db

db-prepare: db-drop db-create db-migrate db-seed

db-create:
	sudo docker compose run --rm app bin/rails db:create RAILS_ENV=development

db-migrate:
	sudo docker compose run --rm app bin/rails db:migrate

db-rollback:
	sudo docker compose run --rm app bin/rails db:rollback

db-seed:
	sudo docker compose run --rm app bin/rails db:seed

db-reset:
	sudo docker compose run --rm app bin/rails db:reset

db-drop:
	sudo docker compose run --rm app bin/rails db:drop

ci-build:
	bundle lock --update
	npm install --package-lock-only 
	sudo docker compose build -q

ci-up-healthy: db-prepare
	sudo docker compose up -d --wait --wait-timeout 60

ci-rubocop: rubocop

ci-clear: clear
