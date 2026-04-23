from collections.abc import Generator
from fastapi import Depends
from sqlalchemy.orm import Session

from src.app.services.clientes_service import ClientesService
from src.app.services.ordenes_service import OrdenesService
from src.app.services.vehiculos_service import VehiculosService
from src.data.database import SessionLocal
from src.data.repositories.clientes_mysql_repo import ClientesMySQLRepository
from src.data.repositories.ordenes_mysql_repo import OrdenesMySQLRepository
from src.data.repositories.vehiculos_mysql_repo import VehiculosMySQLRepository


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_clientes_service(db: Session = Depends(get_db)) -> ClientesService:
    clientes_repo = ClientesMySQLRepository(db)
    return ClientesService(clientes_repo)


def get_vehiculos_service(db: Session = Depends(get_db)) -> VehiculosService:
    clientes_repo = ClientesMySQLRepository(db)
    vehiculos_repo = VehiculosMySQLRepository(db)
    return VehiculosService(vehiculos_repo, clientes_repo)


def get_ordenes_service(db: Session = Depends(get_db)) -> OrdenesService:
    clientes_repo = ClientesMySQLRepository(db)
    vehiculos_repo = VehiculosMySQLRepository(db)
    ordenes_repo = OrdenesMySQLRepository(db)
    return OrdenesService(ordenes_repo, vehiculos_repo, clientes_repo)
