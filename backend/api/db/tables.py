from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import DeclarativeBase, relationship

class Base(DeclarativeBase):
    pass

metadata_obj = Base.metadata

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)

    ideas = relationship("Idea", back_populates="owner", cascade="all, delete-orphan")

class Idea(Base):
    __tablename__ = "idea"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    startup_name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    problem = Column(String, nullable=True)
    target_customer = Column(String, nullable=False)
    competitors = Column(String, nullable=True)
    stage = Column(String, nullable=False)
    industry = Column(String, nullable=False)
    geography = Column(String, nullable=False)
    assumptions = Column(String, nullable=True)

    owner = relationship("User", back_populates="ideas")


user_table = User.__table__
idea_table = Idea.__table__