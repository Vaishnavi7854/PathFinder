# app/crud.py

from app.schemas import users_collection
from app.models import User
from fastapi import HTTPException

async def get_user_by_email(email: str):
    user = await users_collection.find_one({"email": email})
    if user:
        return User(**user)

async def create_user(user: User):
    try:
        user_dict = user.dict()
        await users_collection.insert_one(user_dict)
        return user
    except Exception as e:
        if "duplicate key error" in str(e):
            raise HTTPException(status_code=400, detail="Email already registered")
        raise HTTPException(status_code=500, detail="Database error")