from fastapi import APIRouter, Depends
from src.api.dependencies import get_vehiculos_service
from src.app.services.vehiculos_service import VehiculosService
from src.domain.entities.vehiculo import Vehiculo, VehiculoCreate, VehiculoUpdate

router = APIRouter()

@router.get("/", response_model=list[Vehiculo])
def listar(service: VehiculosService = Depends(get_vehiculos_service)):
    return service.list()

@router.get("/{id_vehiculo}", response_model=Vehiculo)
def obtener(id_vehiculo: int, service: VehiculosService = Depends(get_vehiculos_service)):
    return service.get(id_vehiculo)

@router.post("/", response_model=Vehiculo, status_code=201)
def crear(payload: VehiculoCreate, service: VehiculosService = Depends(get_vehiculos_service)):
    return service.create(payload)

@router.put("/{id_vehiculo}", response_model=Vehiculo)
def actualizar(id_vehiculo: int, payload: VehiculoUpdate, service: VehiculosService = Depends(get_vehiculos_service)):
    return service.update(id_vehiculo, payload)

@router.delete("/{id_vehiculo}", status_code=204)
def eliminar(id_vehiculo: int, service: VehiculosService = Depends(get_vehiculos_service)):
    service.delete(id_vehiculo)
