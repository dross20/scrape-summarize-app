from pydantic import BaseModel
from typing import Optional

class Article(BaseModel):
    id: str
    Date: str
    title: Optional[str]
    link: Optional[str]
    authors: Optional[list[str]]
    subject: Optional[list[str]]
    summary: Optional[str]