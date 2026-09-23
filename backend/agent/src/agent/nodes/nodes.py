from model import model
from langchain_core.messages import SystemMessage , AIMessage
import json
from tools.tools import clarify_idea
from prompts.agent_prompt import understand_idea_prompt
from pydantic import BaseModel, ValidationError


class IdeaHypothesis(BaseModel):
    problem : str
    solution : str
    value_proposition : str
    target_customer : str
    geography : str
    business_model : str
    industry : str


def understand_idea(state : dict):
    system_message = understand_idea_prompt
    
    
    llm_response = model.invoke(
        [
            SystemMessage(content=system_message)
        ]+state["messages"]
    )
    
    result = {
        "messages" : [llm_response],
        "llm_calls" : state["llm_calls"] + 1,
    }
    
    
    return result



def submit_hypothesis(state : dict):
    last_message:AIMessage | None = state["messages"][-1] if state["messages"] else None
    
    content = last_message.content if last_message else "{}"
    try:
        hypothesis = IdeaHypothesis.model_validate_json(content) 
    
    except ValidationError as e:
        raise ValueError(f"Invalid hypothesis format: {e}") from e

    return {
        "hypothesis" : hypothesis,
    }