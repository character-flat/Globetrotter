import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = AsyncIOMotorClient(MONGO_URI, tls=True, tlsAllowInvalidCertificates=True)
db = client["Globetrotter"]  # Explicitly selecting the Globetrotter DB
questions_collection = db["questions"]  # Explicitly selecting the questions collection
users_collection = db["users"]