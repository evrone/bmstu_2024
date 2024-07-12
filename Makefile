SHELL=/bin/sh

UID := $(shell id -u)
GID := $(shell id -g)

setup:
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

db-migrate:
	docker compose run --rm app bin/rails db:migrate

db-rollback:
	docker compose run --rm app bin/rails db:rollback
