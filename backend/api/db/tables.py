from sqlalchemy import MetaData, Table ,Column , Integer , String , ForeignKey
from .config import engine

metadata_obj = MetaData()

user_table = Table(
    "users",
    metadata_obj,
    Column("id" , Integer , primary_key=True),
    Column("email" , String ,nullable=False),
    Column("password" , String ,nullable=False),
)


idea_table = Table(
    "idea",
    metadata_obj,
    Column("id" , Integer , primary_key=True),
    Column("user_id" ,ForeignKey("user_table.id") , nullable=False),
    Column("startup_name" , String, nullable=False),
    Column("description" , String, nullable=False),
    Column("problem" , String),
    Column("target_customer" , String, nullable=False),
    Column("competitors" , String),
    Column("stage" , String , nullable=False),
    Column("industry" , String, nullable=False),
    Column("geography" , String, nullable=False),
    Column("assumptions" , String),
)

metadata_obj.create_all()