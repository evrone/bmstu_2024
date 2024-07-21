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
	sudo docker compose build

deps:
	yarn install && rm -rf ./node_modules
	bundle install

up:
	sudo docker compose up
	sudo docker compose up

down:
	sudo docker compose down
	sudo docker compose down

clear:
	docker compose down -v --rmi all

creds:
	EDITOR='code --wait' bin/rails credentials:edit

ash:
	docker compose run --rm app ash

console:
	docker compose run --rm app bundle exec rails c

yarn:
	sudo docker compose run --rm app yarn install
	sudo docker compose run --rm app yarn install

bundle:
	sudo docker compose run --rm app bundle install
	sudo docker compose run --rm app bundle install

rubocop:
	sudo docker compose run --rm app bundle exec rubocop --config /rails/config/rubocop.yml
	sudo docker compose run --rm app bundle exec rubocop --config /rails/config/rubocop.yml

rubocop-verbose:
	sudo docker compose run --rm app bundle exec rubocop
	sudo docker compose run --rm app bundle exec rubocop

rubocopA:
	sudo docker compose run --rm app bundle exec rubocop --config /rails/config/rubocop.yml -A
	sudo docker compose run --rm app bundle exec rubocop --config /rails/config/rubocop.yml -A

db-psql:
	docker compose run --rm app psql -d ${POSTGRES_DB} -U ${POSTGRES_USER} -W -h db

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
	sudo docker compose run --rm app bin/rails db:drop
	sudo docker compose run --rm app bin/rails db:drop

ci-build:
	bundle lock --update
	npm install --package-lock-only 
	sudo docker compose build -q
	sudo docker compose build -q

ci-up-healthy: db-prepare
	sudo docker compose up -d --wait --wait-timeout 60
	sudo docker compose up -d --wait --wait-timeout 60

ci-rubocop: rubocop

ci-clear: clear
