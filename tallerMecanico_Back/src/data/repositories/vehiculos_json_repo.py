from pathlib import Path
from typing import List, Optional
from src.data.json_storage import JsonStorage
from src.domain.entities.vehiculo import Vehiculo, VehiculoCreate, VehiculoUpdate

class VehiculosJsonRepository:
    def __init__(self, file_path: Path):
        self.storage = JsonStorage(file_path)
        self.id_field = "id_vehiculo"

    def list(self) -> List[Vehiculo]:
        return [Vehiculo(**x) for x in self.storage.list()]

    def get(self, id_vehiculo: int) -> Optional[Vehiculo]:
        for x in self.storage.list():
            if int(x.get(self.id_field)) == int(id_vehiculo):
                return Vehiculo(**x)
        return None

    def create(self, data: VehiculoCreate) -> Vehiculo:
        items = self.storage.list()
        new_id = self.storage.next_id(self.id_field)
        item = {self.id_field: new_id, **data.model_dump()}
        items.append(item)
        self.storage.save_all(items)
        return Vehiculo(**item)

    def update(self, id_vehiculo: int, data: VehiculoUpdate) -> Vehiculo:
        items = self.storage.list()
        for i, x in enumerate(items):
            if int(x.get(self.id_field)) == int(id_vehiculo):
                items[i] = {self.id_field: int(id_vehiculo), **data.model_dump()}
                self.storage.save_all(items)
                return Vehiculo(**items[i])
        return Vehiculo(id_vehiculo=id_vehiculo, **data.model_dump())

    def delete(self, id_vehiculo: int) -> None:
        items = self.storage.list()
        items = [x for x in items if int(x.get(self.id_field)) != int(id_vehiculo)]
        self.storage.save_all(items)
