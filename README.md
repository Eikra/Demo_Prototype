# Demo_Prototype
Makefile Commands
The project includes a Makefile with these convenient commands:

Command	Description
make help	Show all available commands
make build	Build production containers
make up	Start production containers in background
make down	Stop and remove containers
make dev	Start development environment with hot-reload
make logs	View container logs
make test	Run tests
make clean	Remove all containers and volumes
make lint	Run linter
make redis-cli	Access Redis CLI
make bash	Access app container shell
### Performance Metrics
- **API Response Time (Without Cache)**: ~500ms (JSONPlaceholder API)
- **API Response Time (With Redis Cache)**: ~10-50ms
- **Lighthouse Performance Score**:
  - Before: 85 (no caching, full bundle)
  - After: 92 (Redis caching, dynamic imports)
- **Testing Approach**: Used Chrome DevTools for network timing and Lighthouse for overall performance.
### Scaling Vision
To scale this prototype for millions of daily users, I would deploy multiple Next.js instances behind a load balancer (e.g., AWS ALB) to distribute traffic. Redis would be configured in a cluster mode for high availability and data sharding. API responses and static assets would be cached at the edge using a CDN like Cloudflare to reduce latency. For further scalability, the app could be split into microservices (e.g., API gateway, post service) to allow independent scaling and maintenance. If a database is introduced, read replicas and indexing would optimize query performance.
------------------------------------
# Next.js Redis Demo

A scaled-down demo prototype integrating Next.js, React, and Redis for caching API responses from JSONPlaceholder.

## Setup Instructions
### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- Yarn

### Environment Variables
Create a `.env` file in the root directory:
REDIS_URL=redis://localhost:6379
API_BASE_URL=https://jsonplaceholder.typicode.com
NODE_ENV=development

### Running Locally
1. Install dependencies:
   ```bash
   yarn install
2. Start development environment with Docker:

bash
docker compose --profile dev up --build
3. Access the app at http://localhost:3000.

### Running Production:

bash
docker compose --profile prod up --build

Architecture Summary
Next.js Pages:
/: Home page with SSR and CSR sections.
/posts: SSR page with Redis-cached posts.
/posts/[id]: CSR page for individual post details.
Redis Cache: Caches API responses in lib/redis.js with a TTL of 1 hour.
Data Fetching:
Client-side: SWR for /api/posts and /api/posts/[id].
Server-side: getStaticProps with ISR for /posts.
API Routes: /api/posts fetches and caches posts with pagination support.
Performance Metrics
API Response Time (Without Cache): ~500ms
API Response Time (With Redis Cache): ~10-50ms
Lighthouse Performance Score:
Before: 85
After: 92 (with caching and dynamic imports)
Testing Approach: Chrome DevTools for network timing, Lighthouse for performance.
Scaling Vision
To handle millions of users, deploy multiple Next.js instances behind a load balancer (AWS ALB). Use Redis Cluster for high availability and sharding. Cache responses and assets via a CDN (Cloudflare). Split into microservices (API gateway, post service) for independent scaling. Optimize database queries with read replicas and indexing if a database is added.