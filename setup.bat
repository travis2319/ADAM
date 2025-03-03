@echo off
setlocal enabledelayedexpansion

echo Starting setup process...

:: ADAM-APP setup
echo Setting up ADAM-APP...
cd ADAM-APP
call npm install
cd ..

:: ADAM-FASTAPI setup
echo Setting up ADAM-FASTAPI...
cd ADAM-FASTAPI
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
call venv\Scripts\deactivate
cd ..

:: ADAM-GOLANG setup
echo Setting up ADAM-GOLANG...
cd ADAM-GOLANG
docker-compose up --build
docker-compose down
cd ..

echo Setup process completed successfully!
