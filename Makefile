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

key:
	@openssl rand -base64 32 > symmetric_key.txt && \
	SYMMETRIC_KEY=$$(cat symmetric_key.txt) && \
	echo SYMMETRIC_KEY=$$SYMMETRIC_KEY > .env && \
	echo 'symmetric_key.txt generated and added to .env; cp to .env.local'
