from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.db.database import users_collection
from app.schemas.user import UserCreate
from app.utils.hashing import hash_password, verify_password
from app.utils.jwt import create_access_token

router = APIRouter()


@router.post("/register")
def register(user: UserCreate):
    existing = users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password),
        "role": user.role
    }

    result = users_collection.insert_one(new_user)

    return {
        "id": str(result.inserted_id),
        "name": user.name,
        "email": user.email,
        "role": user.role
    }


@router.post("/login")
def login(email: str, password: str):
    user = users_collection.find_one({"email": email})

    if not user or not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "user_id": str(user["_id"]),
        "role": user["role"]
    })

    return {"access_token": token, "token_type": "bearer"}
