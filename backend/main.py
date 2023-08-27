import os
from fastapi import FastAPI
import uvicorn
from dotenv import load_dotenv
from routers import chat
from routers import vector
from routers import caption
from fastapi.responses import HTMLResponse
# Load the environment variables from the .env file
load_dotenv()

# Retrieve the OpenAI API key from the environment variable
openai_api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

@app.get("/", response_class=HTMLResponse)
async def read_root():
    html_content = """
    <html>
        <head>
            <title>Alondra FastAPI</title>
        </head>
        <body>
            <h2>Llama2 Clarifai FastAPI</h2>
            <p>Thanks to: @nor6775 , @matu4824 , @hammad_ali_ , @olofmeister007 and @mi7</p>
        </body>
    </html>
    """
    return html_content

app.include_router(chat.router)

app.include_router(caption.router)

app.include_router(vector.router)




if __name__== '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8001)
