from typing_extensions import TypedDict



class StartupIdea(TypedDict):
    
    problem:str
    solution:str
    value_proposition:str
    
    target_customers:list[str]
    customer_segment:list[str]
    
    industry:str
    sub_industry:str
    
    geography : list[str]
    
    business_model:str
    revenue_model:str
    
    competitors:list[str]
    
    ditribution_channels :list[str]
    
    stage:str
    
    technology: list[str]

    differentiators: list[str]

    assumptions: list[str]

    constraints: list[str]
