# app/schemas.py

from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGO_URL, DATABASE_NAME

client = AsyncIOMotorClient(MONGO_URL)
db = client[DATABASE_NAME]
users_collection = db["users"]

async def init_db():
    try:
        await users_collection.create_index("email", unique=True)
    except Exception as e:
        print(f"Error initializing database: {e}")