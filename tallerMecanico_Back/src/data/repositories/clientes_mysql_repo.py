from typing import Optional
from sqlalchemy.orm import Session

from src.data.models.models import ClienteModel
from src.domain.entities.cliente import Cliente, ClienteCreate, ClienteUpdate


class ClientesMySQLRepository:
    def __init__(self, db: Session):
        self.db = db

    def _to_entity(self, item: ClienteModel) -> Cliente:
        return Cliente(
            id_cliente=item.id_cliente,
            nombre=item.nombre,
            telefono=str(item.telefono) if item.telefono is not None else None,
            email=item.email,
        )

    def list(self):
        items = self.db.query(ClienteModel).order_by(ClienteModel.id_cliente.asc()).all()
        return [self._to_entity(item) for item in items]

    def get(self, id_cliente: int) -> Optional[Cliente]:
        item = self.db.query(ClienteModel).filter(ClienteModel.id_cliente == id_cliente).first()
        if not item:
            return None
        return self._to_entity(item)

    def create(self, data: ClienteCreate) -> Cliente:
        payload = data.model_dump()

        if payload.get("telefono") is not None:
            payload["telefono"] = str(payload["telefono"])

        item = ClienteModel(**payload)
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return self._to_entity(item)

    def update(self, id_cliente: int, data: ClienteUpdate) -> Optional[Cliente]:
        item = self.db.query(ClienteModel).filter(ClienteModel.id_cliente == id_cliente).first()
        if not item:
            return None

        for key, value in data.model_dump(exclude_unset=True).items():
            if key == "telefono" and value is not None:
                value = str(value)
            setattr(item, key, value)

        self.db.commit()
        self.db.refresh(item)
        return self._to_entity(item)

    def delete(self, id_cliente: int) -> bool:
        item = self.db.query(ClienteModel).filter(ClienteModel.id_cliente == id_cliente).first()
        if not item:
            return False

        self.db.delete(item)
        self.db.commit()
        return True