from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.analyze import router as analyze_router

# Create FastAPI application instance
app = FastAPI(
    title="AI Bug Reproduction & Fix Generator",
    description="Backend service for parsing errors, reasoning about root causes, and suggesting validated fixes.",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",   # Vite default
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root endpoint (basic health message)
@app.get("/")
def read_root():
    return {
        "status": "ok",
        "message": "Backend server is running successfully"
    }


# Dedicated health check endpoint
@app.get("/health")
def health_check():
    return {
        "service": "backend",
        "uptime": "running"
    }


# Include analyze routes
app.include_router(analyze_router, tags=["Error Analysis"])
