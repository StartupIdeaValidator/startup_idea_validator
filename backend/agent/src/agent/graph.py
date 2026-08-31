"""LangGraph single-node graph template.

Returns a predefined response. Replace logic and configuration as needed.
"""


from langgraph.graph import StateGraph
from .state import State
from .nodes.understand_idea import understand_idea
from langgraph.graph import START,END





builder = StateGraph(State)

builder.add_node("understand_idea",understand_idea)

builder.add_edge(START,understand_idea)

builder.add_edge(END,understand_idea)

# Define the graph
graph = builder.compile()
