
import os
from langchain_core import init_chat_model

from tools.tools import clarify_idea

api_key = os.environ.get("OPENAI_API_KEY")

raw_model = init_chat_model(
    model = "gpt-4o-mini",
    api_key = api_key
)

tools = [clarify_idea]
tools_by_name = {tools : tool for tool in tools}
model = raw_model.bind_tools(tools_by_name)