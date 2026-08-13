from langchain.chat_models import init_chat_model
from tools.agent_tools import *
from langgraph.graph import StateGraph, START, END
import os
api_key = os.getenv("OPENAI_API_KEY")



from .state.agent_state import AgentState


from .nodes.tool_node import tool_node
from .nodes.analyse import analyse
from .nodes.research import research
from .nodes.understand import understand_idea
from .nodes.generate import generate

from .controllers.ctrls import *


base_model = init_chat_model(
    model="gpt-4o-mini",
    model_provider='openai',
    api_key=api_key
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


def should_continue():
    ...

agent_builder = StateGraph(AgentState)


agent_builder.add_node("tool_node",tool_node)
agent_builder.add_node("understand_idea",understand_idea)
agent_builder.add_node("research",research)
agent_builder.add_node("analyse",analyse)
agent_builder.add_node("generate",generate)


agent_builder.add_edge(START,"understand_idea")

agent_builder.add_conditional_edges(
    "understand_idea",
    step_after_understand,
    ["tool_node","research"]
    )

agent_builder.add_edge(
    "research",
    "tool_node"
    )


agent_builder.add_conditional_edges(
    "tool_node",
    route_after_tools,
    ["research","analyse","generate"]
)

agent_builder.add_edge(END,"generate")


agent = agent_builder.compile()

