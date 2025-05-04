# ---- Builder stage ----
    FROM python:3.12-slim AS builder

    WORKDIR /app
    
    # Install build dependencies
    RUN apt-get update && apt-get install -y --no-install-recommends build-essential
    
    # Upgrade pip and install dependencies to a custom folder
    COPY requirements.txt .
    RUN pip install --upgrade pip && pip install --prefix=/install -r requirements.txt
    
    # ---- Final stage ----
    FROM python:3.12-slim
    
    WORKDIR /app
    
    # Install runtime dependencies
    COPY --from=builder /install /usr/local
    
    # Copy app code
    COPY . /app
    
    # Expose port
    EXPOSE 8000
    
    # Run the app
    CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
    