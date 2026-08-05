from langchain.messages import AnyMessage # langchain messag object , any message 
from typing_extensions import TypedDict , Annotated
import operator



class MessagesState(TypedDict) :
    
    # operator.add let us add new messages in the conversation rather then replacing the whole messages  
    messages: Annotated[list[AnyMessage] , operator.add]
    llm_calls : 0