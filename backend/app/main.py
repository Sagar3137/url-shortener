from fastapi import FastAPI
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler

from app.core.limiter import limiter
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, redirect, urls, users
from app.api import analytics
from app.core.config import settings   
from app.core.exception_handlers import (
    register_exception_handlers,
)

app = FastAPI(title="URL Shortener")
register_exception_handlers(app)

app.state.limiter = limiter

app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler,
)

app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }

app.include_router(auth.router)
app.include_router(urls.router)
app.include_router(analytics.router)
app.include_router(users.router)
app.include_router(redirect.router)