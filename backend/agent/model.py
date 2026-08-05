from langchain.chat_models import init_chat_model
from tools.agent_tools import ask_for_clarifications




model = init_chat_model(
    "gpt-4o-mini",
)



tools = [ask_for_clarifications]
tools_by_name = [tool.name for tool in tools]

model_with_tools = model.bind_tools(tools_by_name)