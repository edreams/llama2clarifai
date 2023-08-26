# llama2clarifai


## Setup

1. Clone the repository to your local machine:


2. Create a `.env` file in the root directory and place your OpenAI API key there:
   openai api key will be used to generate embeddings only
```
  OPENAI_API_KEY=your-api-key
```

3. Install all requirements from requirements.txt file


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


### 2. /generate_image_caption Endpoint
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

### 3. /add_data Endpoint
If the same data_id is used for a different files all the data from the files will be appended and then all the data will be considered when answering a question
Use this endpoint to add data using a PDF file.

HTTP Method: POST
Endpoint: /add_data
Request Body:

file: Upload the PDF file.
data_id: Specify the data ID as a string.



### 4. `/chat` Endpoint

Use this endpoint to initiate a chat with the OpenAI model.

- **HTTP Method:** POST
- **Endpoint:** `/traintube`

**Request Body:**
```json
{
    "link": "https://youtu.be/y2TnIs0kMZw?feature=shared",
    "data_id":"12"
}

```


### 5. /delete Endpoint
This endpoint deletes embeddings already stored for the specific data_id.

HTTP Method: POST
Endpoint: /generate_image_caption

Request Body:
```json
{
    "data_id": "1"
}
```
