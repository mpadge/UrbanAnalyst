.PHONY: all lint dev build

ENGINE=npm

help: ## Show this help
	@printf "Usage:\033[36m make [target]\033[0m\n"
	@grep -E '^[a-zA-Z_%_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help

lint: ## Lint all files
	$(ENGINE) run lint

install: ## Install everything to run/build
	$(ENGINE) install

dev: ## Start dev server
	$(ENGINE) run dev

test: ## Run all tests
	$(ENGINE) run test

build: ## Build site
	$(ENGINE) run build

iv: ## Generate iv key
	@openssl rand -hex 16 > public/data/iv.txt

key: ## Generate symmetric key
	@openssl rand -base64 32 > symmetric_key.txt && \
	SYMMETRIC_KEY=$$(cat symmetric_key.txt) && \
	echo SYMMETRIC_KEY=$$SYMMETRIC_KEY > .env && \
	echo 'symmetric_key.txt generated and added to .env; cp to .env.local'
