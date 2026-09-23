from langchain_core.messages import ToolMessage
from langchain_core.tools import tool
from pydantic import BaseModel
import json


class MissingField(BaseModel):
    field : str
    question : str


@tool
def clarify_idea(missing_fields : list[MissingField] , call_id : str):
    
    res = dict.fromkeys([missing.field for missing in missing_fields], "GG's question for the user")
    return ToolMessage(content=json.dumps(res), tool_call_id = call_id)
    
