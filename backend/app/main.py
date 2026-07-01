from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, redirect, urls
from app.core.config import settings   
from app.core.exception_handlers import (
    register_exception_handlers,
)

app = FastAPI(title="URL Shortener")
register_exception_handlers(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(urls.router)
app.include_router(redirect.router)
