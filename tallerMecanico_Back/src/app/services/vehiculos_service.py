from typing import List
from src.domain.entities.vehiculo import Vehiculo, VehiculoCreate, VehiculoUpdate
from src.domain.errors import NotFoundError, ForeignKeyError
from src.domain.ports.repositories import VehiculoRepository, ClienteRepository

class VehiculosService:
    def __init__(self, repo: VehiculoRepository, clientes_repo: ClienteRepository):
        self.repo = repo
        self.clientes_repo = clientes_repo

    def list(self) -> List[Vehiculo]:
        return self.repo.list()

    def get(self, id_vehiculo: int) -> Vehiculo:
        vehiculo = self.repo.get(id_vehiculo)
        if not vehiculo:
            raise NotFoundError("Vehículo no encontrado")
        return vehiculo

    def create(self, data: VehiculoCreate) -> Vehiculo:
        if not self.clientes_repo.get(data.id_cliente):
            raise ForeignKeyError("El id_cliente no existe")
        return self.repo.create(data)

    def update(self, id_vehiculo: int, data: VehiculoUpdate) -> Vehiculo:
        if not self.repo.get(id_vehiculo):
            raise NotFoundError("Vehículo no encontrado")
        if not self.clientes_repo.get(data.id_cliente):
            raise ForeignKeyError("El id_cliente no existe")
        return self.repo.update(id_vehiculo, data)

    def delete(self, id_vehiculo: int) -> None:
        if not self.repo.get(id_vehiculo):
            raise NotFoundError("Vehículo no encontrado")
        self.repo.delete(id_vehiculo)
