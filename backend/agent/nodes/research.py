from langchain.messages import SystemMessage
from ..model import model
import json



def research(state):
    model_result = [model.invoke(
                    [
                        SystemMessage(content="""                                  
                                      you are a professional Startup Idea Analyser , 
                                      you goal is to do a research about a certain startup idea market , u need to return a json object containing these fields:
                                      ```
                                      competitors : list[str]
                                      
                                      to strengthen ur research u can use these tools :
                                      tools : 
                                        - ask_for_clarifications : pass the fields that u couldn't extract from the user idea and the user will fill them manually
                                      
                                      rules : 
                                      
                                      - if the user didn't clarify the idea to the point where u can't fill all the features specified above u can use a tool to ask for clarifications.
                                      - return a json format od the specified features structure above . 
                                      - don't add any unnecessary text to the result . 
                                      - if a feature is missing dont put it in teh result, at all . 
        
                                      """)
                    ]
                    +state["messages"]
                ) ]
    
    model_content = json.loads(model_result[-1].content)