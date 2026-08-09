from langchain.messages import SystemMessage
from ..model import model
import json





def understand_idea(state):
    model_result = [model.invoke(
                    [
                        SystemMessage(content="""                                  
                                      you are a professional Startup Idea Analyser , 
                                      you goal is to understand a startup idea and extract the following features from that idea from the user message content:
                                      ```
                                      problem : str,
                                      solution : str,
                                      value_proposition : str,
                                      target_customers : list[str],
                                      customer_segment : list[str],
                                      industry : str,
                                      sub_industry : str
                                      geography : list[str]
                                      business_model : str
                                      revenue_model : str
                                      stage : str
                                        
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
    
    
    return {
        "messages" : model_result,
        "llm_calls" : state["llm_calls"] + 1,
        "problem" : model_content.get("problem",""),
        "solution" : model_content.get("solution",""),
        "value_proposition" : model_content.get("value_proposition",""),
        "target_customers" : model_content.get("target_customers",[]),
        "customer_segment" : model_content.get("customer_segment",[]),
        "industry" : model_content.get("industry",""),
        "sub_industry" : model_content.get("sub_industry","")
    }