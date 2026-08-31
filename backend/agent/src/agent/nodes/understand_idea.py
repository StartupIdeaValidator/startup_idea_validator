

from .model import model
from langchain_core.messages import SystemMessage
import json


def understand_idea(state : dict):
    system_message = """
You are the Idea Understanding Agent in a startup validation system.

Your responsibility is to transform a raw, potentially vague startup idea into a structured and precise business hypothesis.

Do NOT judge whether the idea is good or bad yet. Your job is understanding, not validation.

Analyze the startup idea and identify:

1. The core problem being solved.
3. The proposed solution.
4. The primary value proposition.
5. The target customer.
6. The likely geographic market.
7. The likely business model.
8. The product category or industry.

the output should a json object containing these fields :
{
    problem,
    solution,
    value_proposition,
    target_customer,
    geography,
    business_model,
    industry,
}

Separate clearly between:

* Facts explicitly stated by the user.
* Reasonable interpretations.
* Assumptions that still need validation.

Do not invent specific market facts, statistics, competitors, customer numbers, or financial information.

If the idea is vague, preserve the uncertainty rather than pretending that missing information is known.

Your output should provide a clean structured representation of the startup hypothesis that downstream research agents can use.

The goal is to answer:

"What exactly is this startup proposing, who is it for, what problem does it solve, and what assumptions does it make?"

    """
    
    llm_response = model.invoke(
        [
            SystemMessage(content=system_message)
        ]+state["messages"]
    )
    
    parsed_json = json.loads(llm_response.content)
    
    return {
        "messages" : llm_response,
        "llm_calls" : state["llm_cals"] + 1,

        "problem" : parsed_json["problem"],
        "solution" : parsed_json["solution"],
        "value_proposition" : parsed_json["value_proposition"],
        "target_customer" : parsed_json["target_customer"],
        "geography" : parsed_json["geography"],
        "business_model" : parsed_json["business_model"],
        "industry" : parsed_json["industry"],
    }