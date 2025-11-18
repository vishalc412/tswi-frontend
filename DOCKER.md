# Docker Setup Guide

This application is containerized using Docker with separate images for the frontend and backend services.

## Architecture

- **Frontend**: Next.js 14 application (Port 3000)
- **Backend**: Node.js/Express API (Port 8080)
- **Network**: Both services communicate via a bridge network

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

### 1. Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

### 2. Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Individual Service Commands

### Backend Service

```bash
# Build backend image
docker build -t hypothecation-backend ./backend

# Run backend container
docker run -p 8080:8080 --name backend hypothecation-backend

# Check backend health
curl http://localhost:8080/warryworks/health
```

### Frontend Service

```bash
# Build frontend image
docker build -t hypothecation-frontend .

# Run frontend container (requires backend)
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://backend:8080 \
  --name frontend \
  hypothecation-frontend
```

## Environment Variables

### Frontend (.env)
```env
NEXT_PUBLIC_API_MODE=production
NEXT_PUBLIC_API_URL=http://backend:8080
NEXT_PUBLIC_APP_NAME=MS EXIMP Hypothecation Management
NEXT_PUBLIC_APP_VERSION=2.0.0
```

### Backend (.env)
```env
PORT=8080
NODE_ENV=production
```

## Docker Compose Services

### Backend Service
- **Container Name**: hypothecation-backend
- **Port**: 8080
- **Health Check**: Enabled (30s interval)
- **Restart Policy**: unless-stopped

### Frontend Service
- **Container Name**: hypothecation-frontend
- **Port**: 3000
- **Depends On**: backend (waits for health check)
- **Restart Policy**: unless-stopped

## Development vs Production

### Development (Local)
```bash
# Frontend
npm run dev

# Backend
cd backend && npm run dev
```

### Production (Docker)
```bash
docker-compose up -d
```

## Troubleshooting

### Check Container Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Check Container Status
```bash
docker-compose ps
```

### Rebuild Specific Service
```bash
docker-compose up -d --build frontend
docker-compose up -d --build backend
```

### Access Container Shell
```bash
docker exec -it hypothecation-frontend sh
docker exec -it hypothecation-backend sh
```

## Health Checks

Backend health check endpoint:
```bash
curl http://localhost:8080/warryworks/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Hypothecation Management API is healthy",
  "timestamp": "2025-11-18T00:00:00.000Z",
  "version": "1.0.0"
}
```

## Network Configuration

Both services run in a custom bridge network `hypothecation-network`:
- Frontend can access backend via: `http://backend:8080`
- Backend can be accessed externally via: `http://localhost:8080`
- Frontend can be accessed externally via: `http://localhost:3000`

## Production Deployment

For production deployment:

1. Update environment variables in `docker-compose.yml`
2. Configure reverse proxy (nginx/traefik) if needed
3. Enable SSL/TLS certificates
4. Configure proper logging and monitoring
5. Set up backup strategy for data

## API Endpoints

### Backend API
- Health Check: `GET /warryworks/health`
- Addition: `POST /warryworks/addition`
- Continuation: `POST /warryworks/continuation`
- Termination: `POST /warryworks/termination`
- Generate Report: `GET /warryworks/report/generate?report_date=YYYY-MM-DD`
- Download Report: `GET /warryworks/report/download?report_date=YYYY-MM-DD`

## Resource Requirements

### Minimum
- CPU: 2 cores
- RAM: 2 GB
- Disk: 10 GB

### Recommended
- CPU: 4 cores
- RAM: 4 GB
- Disk: 20 GB
