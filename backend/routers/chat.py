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
router = APIRouter()



@router.post('/chat')
async def chat_chatbot(request: Request, data: dict):
    query = data.get('query')
    data_id = data.get('data_id')  
    api = data.get('api')
    USER_ID = "meta"
    APP_ID = "Llama-2"
    MODEL_ID = "llama2-70b-chat"
    # Initialize a Clarifai LLM
    clarifai_llm = Clarifai(
    clarifai_pat_key=api, user_id=USER_ID, app_id=APP_ID, model_id=MODEL_ID)

    persist_directory = f"trained_db/{data_id}/{data_id}_all_embeddings" 
                            
    embeddings = OpenAIEmbeddings()

    prompt_template = f"""You are a chatbot assisting in a conversation with a human. Using both your built-in knowledge and the following extracted parts of a long document, 
                        please provide an answer to the given question. 
                        Your answer should be as detailed as possible if necessary. 
                        If the document does not contain relevant information for answering the question, please make that clear in your response.
                        {{context}}

                        Question: {{question}}

                        Answer :"""
    
    PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(llm=clarifai_llm, chain_type="stuff", prompt=PROMPT)

    try:
        Vectordb = FAISS.load_local(persist_directory, embeddings)
        retriever = Vectordb.as_retriever(search_type="mmr")
        docs = retriever.get_relevant_documents(query)
        ans = chain({"input_documents": docs, "question": query}, return_only_outputs=True)
        answer = ans['output_text']
        pattern = r"(chatbot:|Response:|Answer:|answer:)\s"

        return {'answer': re.sub(pattern, "", answer)}
    except Exception as e:
        return {'error': f'An error occurred while generating Response from Llama-2 :{e}'}

    
    




