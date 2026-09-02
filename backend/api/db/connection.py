import os
from typing import Generator
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

# Load environment variables
load_dotenv(override=True)

def get_database_url() -> str:
    """Construct or retrieve the PostgreSQL database connection URL."""
    custom_url = os.getenv("DATABASE_URL")
    if custom_url:
        return custom_url
    
    db_user = os.getenv("POSTGRES_USER", "db_user")
    db_password = os.getenv("POSTGRES_PASSWORD", "secret123")
    db_name = os.getenv("POSTGRES_DB", "startup_validator")
    db_host = os.getenv("POSTGRES_HOST", "localhost")
    db_port = os.getenv("POSTGRES_PORT", "5432")

    return f"postgresql+psycopg://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

DATABASE_URL = get_database_url()

engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that yields a database session and closes it afterwards."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db() -> None:
    """Creates database tables if they do not exist."""
    from .tables import Base
    Base.metadata.create_all(bind=engine)
