from fastapi import FastAPI
from app.api.analyze import router as analyze_router

# Create FastAPI application instance
app = FastAPI(
    title="AI Bug Reproduction & Fix Generator",
    description="Backend service for parsing errors, reasoning about root causes, and suggesting validated fixes.",
    version="1.0.0"
)


# Root endpoint (basic health message)
@app.get("/")
def read_root():
    return {
        "status": "ok",
        "message": "Backend server is running successfully 🚀"
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
