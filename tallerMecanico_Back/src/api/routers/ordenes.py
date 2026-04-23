from fastapi import APIRouter, Depends
from src.api.dependencies import get_ordenes_service
from src.app.services.ordenes_service import OrdenesService
from src.domain.entities.orden import Orden, OrdenCreate, OrdenUpdate

router = APIRouter()

@router.get("/", response_model=list[Orden])
def listar(service: OrdenesService = Depends(get_ordenes_service)):
    return service.list()

@router.get("/{id_orden}", response_model=Orden)
def obtener(id_orden: int, service: OrdenesService = Depends(get_ordenes_service)):
    return service.get(id_orden)

@router.post("/", response_model=Orden, status_code=201)
def crear(payload: OrdenCreate, service: OrdenesService = Depends(get_ordenes_service)):
    return service.create(payload)

@router.put("/{id_orden}", response_model=Orden)
def actualizar(id_orden: int, payload: OrdenUpdate, service: OrdenesService = Depends(get_ordenes_service)):
    return service.update(id_orden, payload)

@router.delete("/{id_orden}", status_code=204)
def eliminar(id_orden: int, service: OrdenesService = Depends(get_ordenes_service)):
    service.delete(id_orden)
