from fastapi import FastAPI, Request
import os
import re
from fastapi import APIRouter
from langchain.embeddings.openai import OpenAIEmbeddings
from fastapi.responses import FileResponse
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from langchain.vectorstores import FAISS
from langchain import PromptTemplate
from langchain.llms import Clarifai
from decouple import config  # Importamos config desde decouple
router = APIRouter()


# Utilizamos config para obtener el valor de CLARIFAI_PAT desde el archivo .env
CLARIFAI_PAT = config("CLARIFAI_PAT")
print(CLARIFAI_PAT)
@router.post('/chat')
async def chat_chatbot(request: Request, data: dict):
    details = data.get('details')
    data_id = "200" 
    option = data.get('option')
    print("Valor de Option")
    print(option)
    print(type(option))
    api = "a6a0fdf9e62f4ae98b0c87aaba91e143"
    USER_ID = "meta"
    APP_ID = "Llama-2"
    MODEL_ID = "llama2-70b-chat"
    # Initialize a Clarifai LLM
    clarifai_llm = Clarifai(
    clarifai_pat_key=CLARIFAI_PAT, user_id=USER_ID, app_id=APP_ID, model_id=MODEL_ID)

    persist_directory = f"trained_db/{data_id}/{data_id}_all_embeddings" 
                            
    embeddings = OpenAIEmbeddings()
    if str(option) == "1":
        prompt_template = f"""You are a Ebook generator. Generate the ebook using your built-in knowledge and the following extracted parts of a long document.
                        The Ebook should be as detailed and long as possible. 
                        {{context}}

                        Topic/Details: {{question}}

                        Ebook :"""
    elif option == '2':
        prompt_template = f"""You are a blog post generator .Generate a blog post about any topic the user wants .Use both your built-in knowledge and the following extracted parts of a long document, 
                        to generate the blog post. 
                        The generated blog post should be as detailed as possible if necessary. 
                        
                        {{context}}

                        Topic/Details: {{question}}

                        BlogPost :"""
    else :
        return{"message":"Choose option 1 for generating shrt ebook content and option 2 to generate a blog post"}
    
    PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(llm=clarifai_llm, chain_type="stuff", prompt=PROMPT)

    try:
        Vectordb = FAISS.load_local(persist_directory, embeddings)
        retriever = Vectordb.as_retriever(search_type="mmr")
        docs = retriever.get_relevant_documents(details)
        ans = chain({"input_documents": docs, "question": details}, return_only_outputs=True)
        answer = ans['output_text']
        pattern = r"(chatbot:|Response:|Answer:|answer:)\s"

        return {'answer': re.sub(pattern, "", answer)}
    except Exception as e:
        return {'error': f'An error occurred while generating Response from Llama-2 :{e}'}

    
    




