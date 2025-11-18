#!/bin/bash

echo "======================================================================"
echo "MS EXIMP Hypothecation Management - Docker Startup"
echo "======================================================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✓ Docker is installed"
echo "✓ Docker Compose is installed"
echo ""

# Build and start services
echo "🚀 Building and starting services..."
echo ""

docker-compose up --build -d

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================================================"
    echo "✅ Services started successfully!"
    echo "======================================================================"
    echo ""
    echo "📱 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:8080"
    echo ""
    echo "📊 View logs:"
    echo "   docker-compose logs -f"
    echo ""
    echo "🛑 Stop services:"
    echo "   docker-compose down"
    echo ""
    echo "======================================================================"
else
    echo ""
    echo "❌ Failed to start services. Check the logs above for errors."
    exit 1
fi
