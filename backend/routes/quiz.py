from fastapi import APIRouter, HTTPException
import google.generativeai as genai
import os
import json

router = APIRouter()

SYSTEM_INSTRUCTION = """
You are an expert on the Indian election process.
Generate exactly 5 multiple-choice questions about the Indian election process (e.g., voter registration, Lok Sabha, Election Commission of India, EVMs).
Return the result ONLY as a valid JSON array of objects. Do not include markdown code blocks, just the raw JSON.
Each object should have:
- "question": string
- "options": array of 4 strings
- "answer": string (must exactly match one of the options)
- "explanation": string (a short explanation of why the answer is correct)
"""

@router.get("")
async def get_quiz():
    if not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(status_code=500, detail="Gemini API Key is not configured on the server.")
        
    try:
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=SYSTEM_INSTRUCTION
        )
        
        response = model.generate_content("Generate a 5-question election quiz.")
        
        # Parse the JSON response
        try:
            # Strip markdown code blocks if the model accidentally included them
            text = response.text.strip()
            if text.startswith("```json"):
                text = text[7:]
            if text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]
                
            quiz_data = json.loads(text.strip())
            return {"quiz": quiz_data}
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Failed to parse quiz data from AI.")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
