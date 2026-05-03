from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
else:
    print("WARNING: GEMINI_API_KEY environment variable not set.")

SYSTEM_INSTRUCTION = """
You are ElectionIQ, an AI Election Assistant designed to help users, especially first-time voters, understand the election process.
Your goal is to explain how elections work, timelines, and steps in a clear, engaging, and easy-to-follow way.

Guidelines:
- Always respond in simple, beginner-friendly, non-partisan, and factual language.
- Break down complex processes into numbered steps when applicable.
- Encourage civic participation without political bias.
- Cite general civic knowledge (do not promote any party, candidate, or specific political view).
- If a user asks an off-topic question, gracefully redirect them back to election topics.

Example questions you should answer well: "How does the Electoral College work?", "What are the steps to register to vote?", "What happens after Election Day?"
"""

@router.post("/")
async def chat_with_assistant(request: ChatRequest):
    if not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(status_code=500, detail="Gemini API Key is not configured on the server.")
        
    try:
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=SYSTEM_INSTRUCTION
        )
        
        response = model.generate_content(request.message)
        
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
