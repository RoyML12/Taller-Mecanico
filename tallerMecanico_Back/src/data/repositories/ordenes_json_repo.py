from pathlib import Path
from typing import List, Optional
from src.data.json_storage import JsonStorage
from src.domain.entities.orden import Orden, OrdenCreate, OrdenUpdate

class OrdenesJsonRepository:
    def __init__(self, file_path: Path):
        self.storage = JsonStorage(file_path)
        self.id_field = "id_orden"

    def list(self) -> List[Orden]:
        return [Orden(**x) for x in self.storage.list()]

    def get(self, id_orden: int) -> Optional[Orden]:
        for x in self.storage.list():
            if int(x.get(self.id_field)) == int(id_orden):
                return Orden(**x)
        return None

    def create(self, data: OrdenCreate) -> Orden:
        items = self.storage.list()
        new_id = self.storage.next_id(self.id_field)
        item = {self.id_field: new_id, **data.model_dump()}
        items.append(item)
        self.storage.save_all(items)
        return Orden(**item)

    def update(self, id_orden: int, data: OrdenUpdate) -> Orden:
        items = self.storage.list()
        for i, x in enumerate(items):
            if int(x.get(self.id_field)) == int(id_orden):
                items[i] = {self.id_field: int(id_orden), **data.model_dump()}
                self.storage.save_all(items)
                return Orden(**items[i])
        return Orden(id_orden=id_orden, **data.model_dump())

    def delete(self, id_orden: int) -> None:
        items = self.storage.list()
        items = [x for x in items if int(x.get(self.id_field)) != int(id_orden)]
        self.storage.save_all(items)
