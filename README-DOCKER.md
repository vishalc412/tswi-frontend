# 🐳 Docker Deployment Guide

This project is fully dockerized with separate containers for frontend and backend services.

## Quick Start

### Option 1: Using Helper Scripts (Recommended)

```bash
# Start all services
./start-docker.sh

# Stop all services
./stop-docker.sh
```

### Option 2: Using Docker Compose Directly

```bash
# Build and start
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Services

| Service | Port | URL |
|---------|------|-----|
| Frontend (Next.js) | 3000 | http://localhost:3000 |
| Backend (Node.js/Express) | 8080 | http://localhost:8080 |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Docker Network                      │
│                                                      │
│  ┌──────────────────┐      ┌──────────────────┐   │
│  │   Frontend       │      │    Backend       │   │
│  │   (Next.js)      │─────▶│  (Express API)   │   │
│  │   Port: 3000     │      │   Port: 8080     │   │
│  └──────────────────┘      └──────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## File Structure

```
.
├── Dockerfile                 # Frontend Dockerfile
├── docker-compose.yml         # Orchestration config
├── .dockerignore             # Frontend ignore rules
├── start-docker.sh           # Quick start script
├── stop-docker.sh            # Quick stop script
├── backend/
│   ├── Dockerfile            # Backend Dockerfile
│   ├── .dockerignore        # Backend ignore rules
│   ├── package.json         # Backend dependencies
│   └── src/
│       └── server.js        # Express API server
└── DOCKER.md                 # Detailed Docker guide
```

## Environment Variables

### Frontend
- `NEXT_PUBLIC_API_MODE=production`
- `NEXT_PUBLIC_API_URL=http://backend:8080`
- `NEXT_PUBLIC_APP_NAME=MS EXIMP Hypothecation Management`
- `NEXT_PUBLIC_APP_VERSION=2.0.0`

### Backend
- `PORT=8080`
- `NODE_ENV=production`

## Health Checks

Backend includes automatic health checks:
```bash
curl http://localhost:8080/warryworks/health
```

Response:
```json
{
  "status": "ok",
  "message": "Hypothecation Management API is healthy",
  "timestamp": "2025-11-18T00:00:00.000Z",
  "version": "1.0.0"
}
```

## Common Commands

```bash
# View running containers
docker ps

# View all containers
docker ps -a

# View logs
docker-compose logs -f frontend
docker-compose logs -f backend

# Restart a service
docker-compose restart frontend
docker-compose restart backend

# Rebuild a service
docker-compose up -d --build frontend

# Remove all containers and volumes
docker-compose down -v

# Access container shell
docker exec -it hypothecation-frontend sh
docker exec -it hypothecation-backend sh
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use different ports in docker-compose.yml
ports:
  - "3001:3000"  # Map to 3001 instead
```

### Container Won't Start
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Network Issues
```bash
# Recreate network
docker-compose down
docker network prune
docker-compose up -d
```

## Production Deployment

For production:

1. **Update Environment Variables**
   - Set proper API URLs
   - Configure production database
   - Add security keys

2. **Enable SSL/TLS**
   - Use reverse proxy (nginx/traefik)
   - Configure SSL certificates

3. **Resource Limits**
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '2'
         memory: 2G
   ```

4. **Logging**
   - Configure log aggregation
   - Set up monitoring

5. **Backup Strategy**
   - Regular data backups
   - Volume snapshots

## Development Mode

To run in development mode (without Docker):

```bash
# Frontend
npm run dev

# Backend (in separate terminal)
cd backend && npm run dev
```

## API Endpoints

See [DOCKER.md](./DOCKER.md) for complete API documentation.

## Support

For detailed Docker documentation, see [DOCKER.md](./DOCKER.md)

For application documentation, see [README.md](./README.md)
