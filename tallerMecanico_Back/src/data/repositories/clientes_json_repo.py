from pathlib import Path
from typing import List, Optional
from src.data.json_storage import JsonStorage
from src.domain.entities.cliente import Cliente, ClienteCreate, ClienteUpdate

class ClientesJsonRepository:
    def __init__(self, file_path: Path):
        self.storage = JsonStorage(file_path)
        self.id_field = "id_cliente"

    def list(self) -> List[Cliente]:
        return [Cliente(**x) for x in self.storage.list()]

    def get(self, id_cliente: int) -> Optional[Cliente]:
        for x in self.storage.list():
            if int(x.get(self.id_field)) == int(id_cliente):
                return Cliente(**x)
        return None

    def create(self, data: ClienteCreate) -> Cliente:
        items = self.storage.list()
        new_id = self.storage.next_id(self.id_field)
        item = {self.id_field: new_id, **data.model_dump()}
        items.append(item)
        self.storage.save_all(items)
        return Cliente(**item)

    def update(self, id_cliente: int, data: ClienteUpdate) -> Cliente:
        items = self.storage.list()
        for i, x in enumerate(items):
            if int(x.get(self.id_field)) == int(id_cliente):
                items[i] = {self.id_field: int(id_cliente), **data.model_dump()}
                self.storage.save_all(items)
                return Cliente(**items[i])
        return Cliente(id_cliente=id_cliente, **data.model_dump())

    def delete(self, id_cliente: int) -> None:
        items = self.storage.list()
        items = [x for x in items if int(x.get(self.id_field)) != int(id_cliente)]
        self.storage.save_all(items)
