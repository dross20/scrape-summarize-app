from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import dotenv_values
from azure.cosmos.aio import CosmosClient
from routes import router as article_router

config = dotenv_values(".env")
app = FastAPI()

@app.on_event("startup")
async def startup_db_client():
    app.cosmos_client = CosmosClient(config["URI"], credential=config["KEY"])
    app.db = get_db(config["DATABASE_NAME"])
    app.container = get_container(config["CONTAINER_NAME"])

def get_db(db_name):
    return app.cosmos_client.get_database_client(db_name)

def get_container(container_name):
    return app.db.get_container_client(container_name)

app.include_router(article_router, tags=["articles"], prefix="/articles")