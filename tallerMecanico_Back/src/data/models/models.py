from sqlalchemy import Column, Date, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import relationship
from src.data.database import Base


class ClienteModel(Base):
    __tablename__ = 'cliente'

    id_cliente = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(120), nullable=False)
    telefono = Column(String(30), nullable=False)
    email = Column(String(120), nullable=False)

    vehiculos = relationship('VehiculoModel', back_populates='cliente', cascade='all, delete-orphan')
    ordenes = relationship('OrdenServicioModel', back_populates='cliente')


class VehiculoModel(Base):
    __tablename__ = 'vehiculos'

    id_vehiculos = Column(Integer, primary_key=True, index=True, autoincrement=True)
    placa = Column(String(30), nullable=False)
    modelo = Column(String(120), nullable=False)
    id_cliente = Column(Integer, ForeignKey('cliente.id_cliente'), nullable=False, index=True)

    cliente = relationship('ClienteModel', back_populates='vehiculos')
    ordenes = relationship('OrdenServicioModel', back_populates='vehiculo')


class OrdenServicioModel(Base):
    __tablename__ = 'ordenes_servicio'

    id_orden = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_cliente = Column(Integer, ForeignKey('cliente.id_cliente'), nullable=False, index=True)
    id_vehiculo = Column(Integer, ForeignKey('vehiculos.id_vehiculos'), nullable=False, index=True)
    descripcion = Column(Text, nullable=False)
    fecha_ingreso = Column(Date, nullable=False)
    estado = Column(String(50), nullable=False)
    total = Column(Numeric(10, 2), nullable=False)

    cliente = relationship('ClienteModel', back_populates='ordenes')
    vehiculo = relationship('VehiculoModel', back_populates='ordenes')
