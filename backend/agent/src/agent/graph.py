

from langgraph.graph import StateGraph
from .state import State
from langgraph.graph import START,END
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import ToolNode

from .nodes.nodes import understand_idea , submit_hypothesis
from .router import understand_idea_router
from tools.tools import clarify_idea 


tools = [clarify_idea]

checkpointer = InMemorySaver()

builder = StateGraph(State)
tool_node = ToolNode(tools)

builder.add_node("understand_idea",understand_idea)
builder.add_node("tools" , tool_node)
builder.add_node("submit_hypothesis",submit_hypothesis)

builder.add_edge(START,understand_idea)

builder.add_conditional_edges(
    "understand_idea",
    understand_idea_router,
    {
        "submit_hypothesis" : "submit_hypothesis",
        "tools" : "tools"
    }
)

builder.add_edge("tools",understand_idea)

builder.add_edge("submit_hypothesis",END)

# Define the graph
graph = builder.compile(
    checkpointer=checkpointer
)

config =     {
        "configurable" : {
            "thread_id" : "test_thread_1"
        }
    }

result = graph.invoke(
    {
        "messages" : [
            {
                "role" : "user",
                "content" : "Hi , my idea is a resturant booking system"
            }
        ]
    },
    config=config
)