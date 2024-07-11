SHELL=/bin/sh

UID := $(shell id -u)
GID := $(shell id -g)

setup:
	docker compose build

up:
	docker compose up

clear:
	docker compose down -v --rmi all

ash:

console:

db-migrate:

db-rollback:
