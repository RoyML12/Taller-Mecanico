from typing import List, Optional
from sqlalchemy.orm import Session

from src.data.models.models import OrdenServicioModel
from src.domain.entities.orden import Orden, OrdenCreate, OrdenUpdate


class OrdenesMySQLRepository:
    def __init__(self, db: Session):
        self.db = db

    def _to_entity(self, item: OrdenServicioModel) -> Orden:
        return Orden(
            id_orden=item.id_orden,
            id_cliente=item.id_cliente,
            id_vehiculo=item.id_vehiculo,
            descripcion=item.descripcion,
            fecha_ingreso=item.fecha_ingreso.date() if item.fecha_ingreso is not None else None,
            estado=item.estado,
            total=float(item.total) if item.total is not None else None,
        )

    def list(self) -> List[Orden]:
        items = (
            self.db.query(OrdenServicioModel)
            .order_by(OrdenServicioModel.id_orden.asc())
            .all()
        )
        return [self._to_entity(item) for item in items]

    def get(self, id_orden: int) -> Optional[Orden]:
        item = (
            self.db.query(OrdenServicioModel)
            .filter(OrdenServicioModel.id_orden == id_orden)
            .first()
        )
        if not item:
            return None
        return self._to_entity(item)

    def create(self, data: OrdenCreate) -> Orden:
        item = OrdenServicioModel(**data.model_dump())
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return self._to_entity(item)

    def update(self, id_orden: int, data: OrdenUpdate) -> Optional[Orden]:
        item = (
            self.db.query(OrdenServicioModel)
            .filter(OrdenServicioModel.id_orden == id_orden)
            .first()
        )
        if not item:
            return None

        for key, value in data.model_dump(exclude_unset=True).items():
            setattr(item, key, value)

        self.db.commit()
        self.db.refresh(item)
        return self._to_entity(item)

    def delete(self, id_orden: int) -> bool:
        item = (
            self.db.query(OrdenServicioModel)
            .filter(OrdenServicioModel.id_orden == id_orden)
            .first()
        )
        if not item:
            return False

        self.db.delete(item)
        self.db.commit()
        return True