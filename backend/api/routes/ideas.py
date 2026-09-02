from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..db.connection import get_db
from ..db.tables import Idea, User

router = APIRouter(prefix="/ideas", tags=["Ideas"])

class IdeaCreate(BaseModel):
    user_id: int
    startup_name: str
    description: str
    problem: Optional[str] = None
    target_customer: str
    competitors: Optional[str] = None
    stage: str
    industry: str
    geography: str
    assumptions: Optional[str] = None

class IdeaResponse(BaseModel):
    id: int
    user_id: int
    startup_name: str
    description: str
    problem: Optional[str] = None
    target_customer: str
    competitors: Optional[str] = None
    stage: str
    industry: str
    geography: str
    assumptions: Optional[str] = None

    class Config:
        from_attributes = True

@router.post("/", response_model=IdeaResponse, status_code=status.HTTP_201_CREATED)
def create_idea(idea_data: IdeaCreate, db: Session = Depends(get_db)):
    # Verify user exists
    user = db.query(User).filter(User.id == idea_data.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {idea_data.user_id} does not exist"
        )
    
    new_idea = Idea(**idea_data.model_dump())
    db.add(new_idea)
    db.commit()
    db.refresh(new_idea)
    return new_idea

@router.get("/", response_model=List[IdeaResponse])
def get_ideas(db: Session = Depends(get_db)):
    return db.query(Idea).all()

@router.get("/{idea_id}", response_model=IdeaResponse)
def get_idea(idea_id: int, db: Session = Depends(get_db)):
    idea = db.query(Idea).filter(Idea.id == idea_id).first()
    if not idea:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Idea not found"
        )
    return idea
