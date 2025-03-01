from typing import List
from pydantic import BaseModel

class Destination(BaseModel):
    name: str
    clues: List[str]
    fun_facts: List[str]
    trivia: List[str]

class UserNameRequest(BaseModel):
    user_name: str

class AnswerRequest(BaseModel):
    question_id: str
    answer: str
    user_name: str  # Now tracking who answered
