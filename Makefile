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

iv:
	@openssl rand -hex 16 > public/data/iv.txt
