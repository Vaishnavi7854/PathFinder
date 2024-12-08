from fastapi import FastAPI, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from app.models import User, Token
from app.auth import authenticate_user, create_access_token, get_current_user, get_password_hash
from app.crud import create_user
from app.schemas import init_db
from datetime import timedelta  # Add this import
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES  # Add this import
from app.chat import generate_response  # Add this import
from pydantic import BaseModel
from fastapi.responses import JSONResponse

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await init_db()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/signup", response_model=User)
async def signup(user: User):
    user.password = get_password_hash(user.password)
    await create_user(user)
    return user

@app.post("/token", response_model=Token)
async def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True)
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Successfully logged out"}

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

class ChatRequest(BaseModel):
    user_input: str

@app.post("/chat")
async def chat(request: ChatRequest):
    response = generate_response(request.user_input)
    return {"response": response}
