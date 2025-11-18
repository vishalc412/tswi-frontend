#!/bin/bash

echo "======================================================================"
echo "MS EXIMP Hypothecation Management - Stopping Docker Services"
echo "======================================================================"
echo ""

docker-compose down

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Services stopped successfully!"
else
    echo ""
    echo "❌ Failed to stop services."
    exit 1
fi
