from langchain.chat_models import init_chat_model
from tools.agent_tools import *
from langgraph.graph import StateGraph, START, END

from .state.agent_state import AgentState


from .nodes.tool_node import tool_node
from .nodes.analyse import analyse
from .nodes.research import research
from .nodes.understand import understand_idea
from .nodes.generate import generate


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


def should_continue():
    ...

agent_builder = StateGraph(AgentState)


agent_builder.add_node(tool_node)
agent_builder.add_node(understand_idea)
agent_builder.add_node(research)
agent_builder.add_node(analyse)
agent_builder.add_node(generate)


agent_builder.add_conditional_edges(START,"understand_idea")

agent_builder.add_conditional_edges(
    "understand_idea",
    should_continue,
    ["tool_node","research"])

agent_builder.add_edge("understand_idea","research")
agent_builder.add_edge("research","analyse")
agent_builder.add_edge("tool_node","llm_call")

agent_builder.add_conditional_edges(END,"generate")


agent = agent_builder.compile()

