import os
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError

# Correcting the default value for the host (to "localhost" or the service name in Docker)
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "db")  # 'db' matches the service name in Docker Compose
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")
POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "mysecretpassword")
POSTGRES_DB = os.getenv("POSTGRES_DB", "mydb")

def connect_to_db():
    try:
        # Database URL for SQLAlchemy
        db_url = f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
        engine = create_engine(db_url)
        
        # Establish connection
        conn = engine.connect()
        print("Database connection successful.")
        
        # Returning connection object to be used elsewhere
        return conn
    
    except SQLAlchemyError as e:
        # Handling any database-related errors
        raise Exception(f"Database connection failed: {e}")
    


# import os
# from sqlalchemy import create_engine
# from sqlalchemy.exc import SQLAlchemyError

# POSTGRES_HOST = os.getenv("POSTGRES_HOST", "db")
# POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")
# POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
# POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "mysecretpassword")
# POSTGRES_DB = os.getenv("POSTGRES_DB", "mydb")

# def connect_to_db():
#     try:
#         db_url = f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
#         engine = create_engine(db_url)
#         conn = engine.connect()
#         print("Database connection successful.")
#         return conn
#     except SQLAlchemyError as e:
#         raise Exception(f"Database connection failed: {e}")
