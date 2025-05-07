# Makefile for Next.js + Redis project

.PHONY: help build up down dev test clean lint

help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

init: ## Initialize the project (first-time setup)
	@docker compose -f docker-compose.dev.yml run --rm app yarn install

build: ## Build the production containers
	@docker compose build

up: build ## Start the production containers
	@docker compose up -d

down: ## Stop and remove all containers
	@docker compose down

dev: ## Start development environment with hot-reloading
	@docker compose -f docker-compose.dev.yml up --build --remove-orphans

logs: ## View container logs
	@docker compose logs -f

test: ## Run tests
	@docker compose -f docker-compose.dev.yml exec app yarn test

clean: down ## Clean up all containers and volumes
	@docker compose down -v
	@docker system prune -f --volumes

lint: ## Run linter
	@docker compose -f docker-compose.dev.yml exec app yarn lint

redis-cli: ## Access Redis CLI
	@docker compose -f docker-compose.dev.yml exec redis redis-cli

bash: ## Access app container shell
	@docker compose -f docker-compose.dev.yml exec app sh

production: build ## Run production build locally
	@docker compose up -d

health: ## Check container health
	@docker compose -f docker-compose.dev.yml ps