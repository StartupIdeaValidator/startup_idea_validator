import os
from dotenv import load_dotenv
from sqlalchemy import Column, ForeignKey, Integer, MetaData, String, Table, create_engine, text

load_dotenv(override=True)

db_user = os.getenv("POSTGRES_USER")
db_password = os.getenv("POSTGRES_PASSWORD")
db_name = "startup_validator"
PORT = 5432

# Verify environment variables loaded properly
if not db_user or not db_password:
    raise ValueError("Database credentials are missing from the environment variables.")
# Example if your Postgres service/container is named 'db'
engine = create_engine(f"postgresql+psycopg://{db_user}:{db_password}@localhost:5432/{db_name}",echo=True)


with engine.connect() as connection:
    result = connection.execute(text("SELECT 1"))
    print(result.scalar())

metadata_obj = MetaData()

user_table = Table(
    "users",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("email", String, nullable=False),
    Column("password", String, nullable=False),
)

idea_table = Table(
    "idea",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("user_id", ForeignKey("users.id"), nullable=False),  # Fixed target table reference
    Column("startup_name", String, nullable=False),
    Column("description", String, nullable=False),
    Column("problem", String),
    Column("target_customer", String, nullable=False),
    Column("competitors", String),
    Column("stage", String, nullable=False),
    Column("industry", String, nullable=False),
    Column("geography", String, nullable=False),
    Column("assumptions", String),
)

metadata_obj.create_all(engine)