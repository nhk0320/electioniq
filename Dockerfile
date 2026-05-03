# Stage 1: Build the React frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup FastAPI backend
FROM python:3.11-slim
WORKDIR /app/backend

# Install python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy built frontend static files into the backend folder so FastAPI can serve them
COPY --from=frontend-builder /app/frontend/dist /app/backend/static

# Update main.py to serve static files
RUN echo "\n\
from fastapi.staticfiles import StaticFiles\n\
from fastapi.responses import FileResponse\n\
import os\n\
\n\
# Serve static files from the 'static' directory\n\
app.mount('/assets', StaticFiles(directory='static/assets'), name='assets')\n\
\n\
# Catch-all route to serve the React app\n\
@app.get('/{catchall:path}')\n\
def serve_react_app(catchall: str):\n\
    if catchall.startswith('api/'):\n\
        return {'detail': 'Not Found'}\n\
    return FileResponse('static/index.html')\n\
" >> main.py

# Expose port (Cloud Run defaults to 8080)
EXPOSE 8080

# Command to run the application using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
