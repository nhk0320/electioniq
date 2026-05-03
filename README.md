# ElectionIQ

ElectionIQ is an interactive, full-stack web application designed to help users—especially first-time voters—understand the United States election process. It features an AI-powered Election Assistant, an interactive process timeline, dynamic knowledge quizzes, and a searchable glossary.

## 🌟 Features

- **AI Election Assistant**: Ask questions about the electoral college, voting registration, and more. Powered by Google's Gemini AI.
- **Interactive Timeline**: A visual, step-by-step guide explaining the path to the presidency.
- **Dynamic Quiz**: Test your knowledge with 5 AI-generated multiple-choice questions that change every time.
- **Election Dictionary**: Searchable glossary for complex political terms.

## 🧱 Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + Lucide Icons
- **Backend**: Python + FastAPI
- **AI Integration**: Google Gemini API (`gemini-2.5-flash`)
- **Deployment**: Docker + Google Cloud Run

## 🚀 Setup Instructions

### Prerequisites

1. **Node.js** (v18+)
2. **Python** (v3.10+)
3. **Google Gemini API Key**: Get one from Google AI Studio.

### Local Development

#### 1. Backend Setup

Open a terminal and navigate to the root directory, then into `backend`:

```bash
cd backend
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory and add your Gemini API Key:
```env
GEMINI_API_KEY=your_api_key_here
```

Start the FastAPI server:
```bash
uvicorn main:app --reload
```
The backend will run at `http://127.0.0.1:8000`.

#### 2. Frontend Setup

Open a new terminal and navigate to `frontend`:

```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The frontend will run at `http://localhost:5173`.

---

## ☁️ Deployment (Google Cloud Run)

The application is containerized using Docker, combining the compiled React frontend static files with the FastAPI backend into a single service.

### Deploying via Cloud Build

If you have a Google Cloud Project setup with billing enabled, you can deploy using the provided `cloudbuild.yaml`.

1. Authenticate with Google Cloud CLI:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. Submit the build to Cloud Build (replace with your actual API key):
   ```bash
   gcloud builds submit --config cloudbuild.yaml --substitutions _GEMINI_API_KEY="your_api_key_here" .
   ```

3. The output will provide the public URL where ElectionIQ is hosted.
