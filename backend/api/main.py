from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session
from .db.connection import get_db, init_db
from .routes import ideas, users

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables on application startup
    try:
        init_db()
        print("Database tables initialized successfully.")
    except Exception as e:
        print(f"Warning: Database initialization failed on startup: {e}")
    yield

app = FastAPI(
    title="Startup Idea Validator API",
    description="Backend API for Startup Idea Validator with PostgreSQL connection.",
    version="1.0.0",
    lifespan=lifespan,
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register sub-routers
app.include_router(users.router, prefix="/api")
app.include_router(ideas.router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Welcome to the Startup Idea Validator API",
        "docs": "/docs",
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/health/db")
def db_health_check(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1")).scalar()
        if result == 1:
            return {"status": "healthy", "database": "connected"}
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unexpected database response",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database connection error: {str(e)}",
        )
