from fastapi import APIRouter, HTTPException
from app.config import questions_collection, users_collection
import random
from bson import ObjectId
from app.models import UserNameRequest, AnswerRequest

router = APIRouter()

@router.get("/get-question")
async def get_question():
    total_count = await questions_collection.count_documents({})

    if total_count == 0:
        raise HTTPException(status_code=404, detail="No questions found")

    pipeline = [
    { '$sample': { 'size': 4 } }  # Adjust the size to the number of random documents you want
    ]
    #import pdb; pdb.set_trace()
    documents = await questions_collection.aggregate(pipeline).to_list()

    if not documents:
        raise HTTPException(status_code=500, detail="Error fetching a random question")

    question = documents[0]
    options = [doc.get('name') for doc in documents]

    return {
        "id": str(question.get('_id')),
        "clues": question["clues"],
        "options": options,
    }

@router.post("/submit-answer")
async def submit_answer(data: AnswerRequest):
    """Check user's answer, update score, and return feedback along with score."""
    question = await questions_collection.find_one({"_id": ObjectId(data.question_id)})
    
    if not question:
        raise HTTPException(status_code=404, detail="Question not found.")
    
    correct_answer = question["name"]
    is_correct = data.answer.lower() == correct_answer.lower()

    user = await users_collection.find_one({"name": data.user_name})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Update user score
    update_field = "correct_answers" if is_correct else "incorrect_answers"
    await users_collection.update_one(
        {"name": data.user_name}, {"$inc": {update_field: 1}}
    )

    # Fetch updated user score
    updated_user = await users_collection.find_one({"name": data.user_name})
    total_correct = updated_user.get("correct_answers", 0)
    total_incorrect = updated_user.get("incorrect_answers", 0)

    return {
        "correct": is_correct,
        "feedback": f"🎉 Correct! Your answer: {correct_answer}." if is_correct else f"😢 Incorrect! The answer was {correct_answer}.",
        "fun_fact": random.choice(question["funFacts"]),
        "score": {
            "correct_answers": total_correct,
            "incorrect_answers": total_incorrect
        }
    }

@router.post("/is-unique")
async def is_unique(data: UserNameRequest):
    names = await users_collection.find({"name": data.user_name}).to_list(length=1)
    return len(names) == 0  # Returns True if unique, False if username exists

@router.post("/create-profile")
async def create_profile(data: UserNameRequest):
    existing_user = await users_collection.find_one({"name": data.user_name})
    
    # if existing_user:
    #     raise HTTPException(status_code=400, detail="Username already exists.")

    await users_collection.insert_one({"name": data.user_name})
    return {"message": "Profile created successfully"}


@router.get("/user-score")
async def get_user_score(userName: str):
    user = await users_collection.find_one({"name": userName})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    return {
        "correct_answers": user.get("correct_answers", 0),
        "incorrect_answers": user.get("incorrect_answers", 0)
    }
