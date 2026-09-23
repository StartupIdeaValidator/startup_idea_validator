
from langchain_core.messages import AnyMessage
from pydantic import BaseModel
from typing_extensions import Annotated ,TypedDict
import operator
from pydantic import BaseModel


class IdeaHypothesis(BaseModel):
    problem : str
    solution : str
    value_proposition : str
    target_customer : str
    geography : str
    business_model : str
    industry : str

class State(TypedDict):
    
    messages : Annotated[list[AnyMessage] , operator.add]
    llm_calls : int = 0 
    
    
    hypothesis : IdeaHypothesis 