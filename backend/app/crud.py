# app/crud.py

from app.schemas import users_collection
from app.models import User

async def get_user_by_email(email: str):
    user = await users_collection.find_one({"email": email})
    if user:
        return User(**user)

async def create_user(user: User):
    await users_collection.insert_one(user.dict())