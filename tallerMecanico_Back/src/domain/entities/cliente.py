from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ClienteBase(BaseModel):
    nombre: str = Field(min_length=1, max_length=120)
    telefono: str = Field(min_length=5, max_length=30)
    email: EmailStr


class ClienteCreate(ClienteBase):
    pass


class ClienteUpdate(ClienteBase):
    pass


class Cliente(ClienteBase):
    id_cliente: int

    model_config = ConfigDict(from_attributes=True)
