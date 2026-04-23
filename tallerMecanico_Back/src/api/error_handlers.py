from fastapi import FastAPI
from fastapi.responses import JSONResponse
from src.domain.errors import NotFoundError, ForeignKeyError

def register_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(NotFoundError)
    def _not_found(_, exc: NotFoundError):
        return JSONResponse(status_code=404, content={"detail": str(exc)})

    @app.exception_handler(ForeignKeyError)
    def _fk(_, exc: ForeignKeyError):
        return JSONResponse(status_code=400, content={"detail": str(exc)})
