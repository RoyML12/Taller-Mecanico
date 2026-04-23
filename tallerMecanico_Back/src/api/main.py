from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.routers import clientes, vehiculos, ordenes
from src.api.error_handlers import register_error_handlers

app = FastAPI(title="Taller Mecanico")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_error_handlers(app)

app.include_router(clientes.router, prefix="/clientes", tags=["Clientes"])
app.include_router(vehiculos.router, prefix="/vehiculos", tags=["Vehículos"])
app.include_router(ordenes.router, prefix="/ordenes", tags=["Órdenes"])