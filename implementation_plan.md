# ElectionIQ Implementation Plan

This document outlines the architecture and step-by-step implementation for "ElectionIQ", an interactive web application designed to educate users on the election process.

## Background Context
The application consists of a React frontend and a Python (FastAPI) backend. It leverages the Google Gemini API to power an AI Election Assistant, dynamic quizzes, and a searchable glossary. The app will be containerized and deployed to Google Cloud Run.

## User Review Required
> [!IMPORTANT]
> The app requires a Google Gemini API key to function. I will need you to provide the `GEMINI_API_KEY` when running the backend locally or during deployment.
> 
> Also, since we will deploy this to Google Cloud Run, please confirm if you already have a Google Cloud Project set up with billing enabled, and if you have the `gcloud` CLI installed locally.

## Open Questions
> [!WARNING]
> 1. Should we use Vite to bootstrap the React frontend (recommended for modern React apps)?
> 2. For the database, since there is no mention of persistent user accounts or storing quiz results permanently, I will assume we can keep the app stateless or use simple in-memory storage for the current session. Please confirm.

## Proposed Changes

### 1. Workspace Setup
Initialize the base folder structure and Git repository.
- `frontend/`
- `backend/`
- `Dockerfile`
- `cloudbuild.yaml`
- `README.md`

### 2. Backend (FastAPI)
The backend will serve as an API gateway for the Gemini model and handle business logic.

#### [NEW] `backend/requirements.txt`
Dependencies: `fastapi`, `uvicorn`, `google-generativeai`, `pydantic`, `python-dotenv`.

#### [NEW] `backend/main.py`
Entry point for the FastAPI application. Sets up CORS and includes routers.

#### [NEW] `backend/routes/chat.py`
Endpoints for the AI Election Assistant. Uses Gemini with a specific system prompt to answer election-related questions in a non-partisan way.

#### [NEW] `backend/routes/quiz.py`
Endpoints to generate a 5-question dynamic quiz using Gemini.

#### [NEW] `backend/routes/glossary.py`
Endpoints to define election terms using Gemini.

### 3. Frontend (React + Tailwind CSS)
A Vite-based React application with Tailwind for styling.

#### [NEW] `frontend/package.json`
Dependencies: `react`, `react-dom`, `tailwindcss`, `axios` (for API calls), `lucide-react` (for icons).

#### [NEW] `frontend/src/App.jsx`
Main application layout, routing between the different features.

#### [NEW] `frontend/src/components/ChatAssistant.jsx`
Chat interface to interact with the backend chat endpoint.

#### [NEW] `frontend/src/components/Timeline.jsx`
Interactive step-by-step visual timeline of the election process.

#### [NEW] `frontend/src/components/Quiz.jsx`
Component to display and grade the dynamically generated quiz.

#### [NEW] `frontend/src/components/Glossary.jsx`
Searchable glossary component.

#### [NEW] `frontend/tailwind.config.js` & `frontend/src/index.css`
Tailwind configuration and global styles (civic/patriotic color scheme).

### 4. Deployment Configuration
#### [NEW] `Dockerfile`
A multi-stage Dockerfile that builds the React frontend and serves it using FastAPI as static files, OR a Dockerfile that only containerizes the backend (FastAPI) while the frontend is deployed separately. Given Cloud Run, deploying a single container serving both or two separate containers are options. I propose serving the built React static files via the FastAPI server to keep it as a single container deployment for simplicity.

#### [NEW] `cloudbuild.yaml`
Configuration for Google Cloud Build to build and deploy the Docker image to Cloud Run.

#### [NEW] `README.md`
Comprehensive project documentation including setup and deployment instructions.

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure the frontend compiles without errors.
- Start the FastAPI server locally and test endpoints using Swagger UI (`/docs`).

### Manual Verification
- **Local Testing**: Run both frontend (`npm run dev`) and backend (`uvicorn main:app --reload`) locally, and interact with the Chat, Quiz, and Glossary features to ensure Gemini integration works.
- **Visual Check**: Verify the UI adheres to the civic/patriotic color scheme and is responsive.
- **Deployment**: Provide the exact commands to build and deploy to Cloud Run and verify the live public URL.
