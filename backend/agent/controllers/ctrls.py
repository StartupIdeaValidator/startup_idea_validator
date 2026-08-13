from state.agent_state import AgentState
from langchain.messages import ToolMessage
from model import tools_by_name


def step_after_understand(state:AgentState):
    
    tool_call = state["messages"][-1].tool_calls[0]
    
    if tool_call:
        return "tool_node"
    else:
        return "research"
    
    
def route_after_tools(state:dict):
    
    messages = state.get("messages",{})
    
    for msg in reversed(messages):
        
        if hasattr(msg,"tool_calls") and msg.tool_calls:
            
            if msg.name == "understand_idea":
                return "research"
            elif msg.name == "research":
                return "analyse"
            elif msg.name == "analyse":
                return "generate"
    
def step_after_research(state:dict):
    ...