from state import State
from typing import Literal




def understand_idea_router(state : State) -> Literal["submit_hypothesis" , "tools"]:
    
    last_message = state["messages"][-1] if state["messages"] else None
    
    if last_message and last_message.tool_calls:
        return "tools"
    else:
        return "submit_hypothesis"