from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os

router = APIRouter()

class TermRequest(BaseModel):
    term: str

SYSTEM_INSTRUCTION = """
You are a glossary assistant for an election education app focused on India.
Provide a clear, simple, and non-partisan definition for the requested Indian election term (e.g., EVM, VVPAT, Model Code of Conduct, Lok Sabha).
The definition should be easy to understand for a first-time voter (1-3 sentences maximum).
"""

@router.post("")
async def define_term(request: TermRequest):
    if not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(status_code=500, detail="Gemini API Key is not configured on the server.")
        
    try:
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=SYSTEM_INSTRUCTION
        )
        
        prompt = f"Define the election term: '{request.term}'"
        response = model.generate_content(prompt)
        
        return {"term": request.term, "definition": response.text.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
