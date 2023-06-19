.PHONY: all lint dev build

ENGINE=yarn
#ENGINE=npm run

all: dev

lint:
	$(ENGINE) lint

dev:
	$(ENGINE)  dev

build:
	yarn build
