
from langchain_core.messages import AnyMessage
from typing_extensions import Annotated ,TypedDict
import operator


class State():
    
    messages : Annotated[list[AnyMessage] , operator.add]
    llm_calls : int 
    
    
    problem : list[str]
    solution : list[str] 
    target_customers : list[str]
    geography : list[str]
    business_model : str