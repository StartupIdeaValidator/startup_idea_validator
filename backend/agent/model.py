from langchain.chat_models import init_chat_model
from tools.agent_tools import *
from langgraph.graph import StateGraph, START, END
from .state.messages_state import MessagesState
from .nodes.model_node import *
from .nodes.tool_node import *


def should_continue(state: MessagesState):
    """Decide if we should continue the loop or stop based upon whether the LLM made a tool call"""

    messages = state["messages"]
    last_message = messages[-1]

    # If the LLM makes a tool call, then perform an action
    if last_message.tool_calls:
        return "tool_node"

    # Otherwise, we stop (reply to the user)
    return END



base_model = init_chat_model(
    "gpt-4o-mini",
)


tools = [ask_for_clarifications,
         find_competitors,
         scrape_competitors_website,
         research_market,
         analyze_business,
         calculate_market_size,
         gen_swot,
         gen_report,
         gen_recomondations,
         gen_lean_canvas,
         gen_business_model]

tools_by_name = [tool.name for tool in tools]

model = base_model.bind_tools(tools_by_name)



agent_builder = StateGraph(MessagesState)


agent_builder.add_node(tool_node)
agent_builder.add_node(llm_call)


agent_builder.add_conditional_edges(START,"llm_call")

agent_builder.add_conditional_edges(
    "llm_call",
    should_continue,
    ["tool_node",END]
)

agent_builder.add_node("tool_node","llm_call")


agent = agent_builder.compile()

