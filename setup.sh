#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting setup process..."

# ADAM-APP setup
echo "Setting up ADAM-APP..."
cd ADAM-APP
npm install
cd ..

# ADAM-FASTAPI setup
echo "Setting up ADAM-FASTAPI..."
cd ADAM-FASTAPI
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate
cd ..

# ADAM-GOLANG setup
echo "Setting up ADAM-GOLANG..."
cd ADAM-GOLANG
docker compose up --build
docker compose down
cd ..

echo "Setup process completed successfully!"
