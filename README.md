# llama2clarifai


## Setup

1. Clone the repository to your local machine:


2. Create a `.env` file in the root directory and place your OpenAI API key there:
   openai api key will be used to generate embeddings only
```
  OPENAI_API_KEY=your-api-key
```

## Endpoints

### 1. `/chat` Endpoint

Use this endpoint to initiate a chat with the OpenAI model.

- **HTTP Method:** POST
- **Endpoint:** `/chat`

**Request Body:**
```json
{
 "query": "what is special about the api",
 "data_id": "12",
 "api": "clarifai-api-key"
}
```


2. /generate_image_caption Endpoint
This endpoint generates a caption for an image using the OpenAI model.

HTTP Method: POST
Endpoint: /generate_image_caption

Request Body:
```json
{
    "image_url": "https://samples.clarifai.com/metro-north.jpg",
    "api": "clarifai-api-key"
}
```

3. /add_data Endpoint
Use this endpoint to add data using a PDF file.

HTTP Method: POST
Endpoint: /add_data
Request Body:

file: Upload the PDF file.
data_id: Specify the data ID as a string.
