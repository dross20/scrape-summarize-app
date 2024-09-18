from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from typing import List
from models import Article
import datetime
from dateutil import tz

router = APIRouter()

@router.get("/", response_description="List of all articles", response_model=List[Article])
async def list_articles(request: Request):
    articles = [article async for article in request.app.container.read_all_items()]
    return articles

@router.get("/today", response_description="All articles from today", response_model=List[Article])
async def list_articles_by_day(request: Request):
    today = datetime.datetime.now(datetime.timezone.utc)
    today = today.astimezone(tz.gettz('America/Los_Angeles')).strftime("%x")
    articles = [article async for article in request.app.container.query_items(query='SELECT * FROM Articles a WHERE a.Date = @today', parameters=[dict(name='@today', value=today)])]
    return articles

@router.get("/date", response_description="All articles from a given day", response_model=List[Article])
async def list_articles_by_day(request: Request, date: str):
    articles = [article async for article in request.app.container.query_items(query='SELECT * FROM Articles a WHERE a.Date = @date', parameters=[dict(name='@date', value=date)])]
    return articles