from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.core.exceptions import (
    ResourceNotFoundError,
    ForbiddenError,
    ConflictError,
)


def register_exception_handlers(app: FastAPI):

    @app.exception_handler(ResourceNotFoundError)
    async def resource_not_found_handler(
        _request: Request,
        exc: ResourceNotFoundError,
    ):
        return JSONResponse(
            status_code=404,
            content={"detail": str(exc)},
        )

    @app.exception_handler(ForbiddenError)
    async def forbidden_handler(
        _request: Request,
        exc: ForbiddenError,
    ):
        return JSONResponse(
            status_code=403,
            content={"detail": str(exc)},
        )

    @app.exception_handler(ConflictError)
    async def conflict_handler(
        _request: Request,
        exc: ConflictError,
    ):
        return JSONResponse(
            status_code=409,
            content={"detail": str(exc)},
        )