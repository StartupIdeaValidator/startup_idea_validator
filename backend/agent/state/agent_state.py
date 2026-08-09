from langchain.messages import AnyMessage # langchain messag object , any message 
from typing_extensions import TypedDict , Annotated
import operator
from ..classes.competitor import Competitor



class AgentState(TypedDict) :
    
    # operator.add let us add new messages in the conversation rather then replacing the whole messages  
    messages: Annotated[list[AnyMessage] , operator.add]
    llm_calls : 0
    
    problem:str
    solution:str
    value_proposition:str
    
    target_customers:list[str]
    customer_segment:list[str]
    
    industry:str
    sub_industry:str
    
    geography : list[str]
    
    business_model:str
    revenue_model:str
    
    competitors:list[str]
    
    ditribution_channels :list[str]
    
    stage:str
    
    technology: list[str]

    differentiators: list[str]

    assumptions: list[str]

    constraints: list[str]
    
    competitors : list[Competitor]
    