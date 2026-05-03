import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="ElectionIQ API",
    description="Backend API for the ElectionIQ education app",
    version="1.0.0"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routes
from routes import chat, quiz, glossary

# Include routers
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(quiz.router, prefix="/api/quiz", tags=["Quiz"])
app.include_router(glossary.router, prefix="/api/glossary", tags=["Glossary"])

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# Serve static files from the 'static' directory if it exists
if os.path.exists("static"):
    app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")

    @app.get("/{catchall:path}")
    async def serve_react_app(catchall: str):
        if catchall.startswith("api/"):
            return {"detail": "Not Found"}
        return FileResponse("static/index.html")
else:
    @app.get("/")
    async def root():
        return {"message": "Welcome to ElectionIQ API (Static files not found)"}
