# Link Reductor

A minimal and clean URL shortening service with a modern web interface.

## Project Structure
```
.
├── back/          # Django backend (DRF)
├── front/         # Next.js frontend
└── docker-compose.yml
```

## Quick Start with Docker

1. Clone the repository

2. Create environment files:
   - `back/.env` (see `back/.env.example`)
   - `front/.env` (see `front/.env.example`)

3. Build and run with Docker Compose:
```bash
docker-compose up --build
```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/api/docs

For subsequent runs, you can use just `docker-compose up` (without `--build`).

To stop the services:
```bash
docker-compose down
```

## Services

- **client**: Next.js frontend (port 3000)
- **server**: Django backend (port 8000)
- **postgres**: PostgreSQL database (port 5432)

## Development

See individual README files in `back/` and `front/` directories for local development setup without Docker.

## Features

- Shorten long URLs to compact links
- Copy shortened URLs with one click
- Clean, minimal interface
- RESTful API
- PostgreSQL persistence
