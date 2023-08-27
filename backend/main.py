import os
from fastapi import FastAPI
import uvicorn
from dotenv import load_dotenv
from routers import chat
from routers import vector
from routers import caption
from routers import youtube
# Load the environment variables from the .env file
load_dotenv()

# Retrieve the OpenAI API key from the environment variable
openai_api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()


app.include_router(chat.router)

app.include_router(caption.router)

app.include_router(vector.router)

app.include_router(youtube.router)


if __name__== '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8080)
