from typing import List, Optional
from sqlalchemy.orm import Session

from src.data.models.models import VehiculoModel
from src.domain.entities.vehiculo import Vehiculo, VehiculoCreate, VehiculoUpdate


class VehiculosMySQLRepository:
    def __init__(self, db: Session):
        self.db = db

    def list(self) -> List[Vehiculo]:
        items = self.db.query(VehiculoModel).order_by(VehiculoModel.id_vehiculos.asc()).all()
        return [Vehiculo.model_validate(item) for item in items]

    def get(self, id_vehiculo: int) -> Optional[Vehiculo]:
        item = self.db.query(VehiculoModel).filter(VehiculoModel.id_vehiculos == id_vehiculo).first()
        if not item:
            return None
        return Vehiculo.model_validate(item)

    def create(self, data: VehiculoCreate) -> Vehiculo:
        item = VehiculoModel(**data.model_dump())
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return Vehiculo.model_validate(item)

    def update(self, id_vehiculo: int, data: VehiculoUpdate) -> Vehiculo:
        item = self.db.query(VehiculoModel).filter(VehiculoModel.id_vehiculos == id_vehiculo).first()
        for key, value in data.model_dump().items():
            setattr(item, key, value)
        self.db.commit()
        self.db.refresh(item)
        return Vehiculo.model_validate(item)

    def delete(self, id_vehiculo: int) -> None:
        item = self.db.query(VehiculoModel).filter(VehiculoModel.id_vehiculos == id_vehiculo).first()
        self.db.delete(item)
        self.db.commit()
