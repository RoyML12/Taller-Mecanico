from fastapi import APIRouter, Depends
from src.api.dependencies import get_clientes_service
from src.app.services.clientes_service import ClientesService
from src.domain.entities.cliente import Cliente, ClienteCreate, ClienteUpdate

router = APIRouter()

@router.get("/", response_model=list[Cliente])
def listar(service: ClientesService = Depends(get_clientes_service)):
    return service.list()

@router.get("/{id_cliente}", response_model=Cliente)
def obtener(id_cliente: int, service: ClientesService = Depends(get_clientes_service)):
    return service.get(id_cliente)

@router.post("/", response_model=Cliente, status_code=201)
def crear(payload: ClienteCreate, service: ClientesService = Depends(get_clientes_service)):
    return service.create(payload)

@router.put("/{id_cliente}", response_model=Cliente)
def actualizar(id_cliente: int, payload: ClienteUpdate, service: ClientesService = Depends(get_clientes_service)):
    return service.update(id_cliente, payload)

@router.delete("/{id_cliente}", status_code=204)
def eliminar(id_cliente: int, service: ClientesService = Depends(get_clientes_service)):
    service.delete(id_cliente)
