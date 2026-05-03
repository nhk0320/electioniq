# ElectionIQ

ElectionIQ is an interactive, full-stack web application designed to help users—especially first-time voters—understand the Indian election process. It features an AI-powered Election Assistant, an interactive process timeline, dynamic knowledge quizzes, and a searchable glossary.

## 🌟 Features

- **AI Election Assistant**: Ask questions about the electoral college, voting registration, and more. Powered by Google's Gemini AI.
- **Interactive Timeline**: A visual, step-by-step guide explaining the path to forming a government in India.
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

## ☁️ Deployment Guide

### Step 1: Set Up Google Cloud

**Install Google Cloud CLI**
```bash
# Download and install from:
https://cloud.google.com/sdk/docs/install
```

**Login and create a project**
```bash
gcloud auth login
gcloud projects create electioniq-app --name="ElectionIQ"
gcloud config set project electioniq-app
```

**Enable billing**
- Go to [console.cloud.google.com](https://console.cloud.google.com)
- Navigate to **Billing** → link a billing account to `electioniq-app`
- (Cloud Run has a generous free tier, you won't be charged much)

**Enable required APIs**
```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### Step 2: Deploy Backend to Cloud Run

```bash
# Navigate to your backend folder
cd backend

# Build and push the Docker image
gcloud builds submit --tag gcr.io/electioniq-app/backend

# Deploy to Cloud Run
gcloud run deploy electioniq-backend \
  --image gcr.io/electioniq-app/backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_api_key_here
```

After this you'll get a **backend URL** like:
`https://electioniq-backend-xxxx-uc.a.run.app`

### Step 3: Update Frontend with Backend URL

Before deploying frontend, update your API base URL:

```javascript
// In your frontend src/config.js or .env file
REACT_APP_API_URL=https://electioniq-backend-xxxx-uc.a.run.app
```

### Step 4: Deploy Frontend to Cloud Run

```bash
# Navigate to your frontend folder
cd frontend

# Build and push the Docker image
gcloud builds submit --tag gcr.io/electioniq-app/frontend

# Deploy to Cloud Run
gcloud run deploy electioniq-frontend \
  --image gcr.io/electioniq-app/frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

You'll get a **frontend URL** like:
`https://electioniq-frontend-xxxx-uc.a.run.app` ✅ This is your live app!

### Step 5: Push to GitHub

```bash
# In your project root folder
git init
git add .
git commit -m "Initial commit - ElectionIQ app"

# Create a new repo on github.com first, then:
git remote add origin https://github.com/yourusername/electioniq.git
git branch -M main
git push -u origin main
```

### Step 6: Verify Everything Works

```bash
# Check your running services
gcloud run services list

# Check logs if something breaks
gcloud logs read --service=electioniq-backend
gcloud logs read --service=electioniq-frontend
```
