from typing import List
from src.domain.entities.cliente import Cliente, ClienteCreate, ClienteUpdate
from src.domain.errors import NotFoundError
from src.domain.ports.repositories import ClienteRepository

class ClientesService:
    def __init__(self, repo: ClienteRepository):
        self.repo = repo

    def list(self) -> List[Cliente]:
        return self.repo.list()

    def get(self, id_cliente: int) -> Cliente:
        cliente = self.repo.get(id_cliente)
        if not cliente:
            raise NotFoundError("Cliente no encontrado")
        return cliente

    def create(self, data: ClienteCreate) -> Cliente:
        return self.repo.create(data)

    def update(self, id_cliente: int, data: ClienteUpdate) -> Cliente:
        if not self.repo.get(id_cliente):
            raise NotFoundError("Cliente no encontrado")
        return self.repo.update(id_cliente, data)

    def delete(self, id_cliente: int) -> None:
        if not self.repo.get(id_cliente):
            raise NotFoundError("Cliente no encontrado")
        self.repo.delete(id_cliente)
