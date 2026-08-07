from langchain.chat_models import init_chat_model
from tools.agent_tools import *




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