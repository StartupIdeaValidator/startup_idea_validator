from langchain.messages import SystemMessage
from ..model import model



def llm_call(state:dict):
    
    return {
        "messages" : [model.invoke(
          [
              SystemMessage(
                  content = "you are a professional Idea validator who can understand a startup idea"
              )
          ]+
          state["messages"]  
        )],
        
        "llm_calls" : state.get("llm_calls",0) + 1
    }