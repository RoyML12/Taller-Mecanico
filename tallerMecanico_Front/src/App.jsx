import { useEffect, useMemo, useState } from 'react';
import {
  FaCar,
  FaClipboardList,
  FaPlus,
  FaPlusCircle,
  FaTruck,
  FaUserPlus,
  FaUsers,
  FaWrench,
} from 'react-icons/fa';
import SearchBar from './components/common/SearchBar';
import Tabs from './components/common/Tabs';
import Modal from './components/common/Modal';
import Toast from './components/common/Toast';
import ClientesTable from './components/clientes/ClientesTable';
import ClienteForm from './components/clientes/ClienteForm';
import VehiculosTable from './components/vehiculos/VehiculosTable';
import VehiculoForm from './components/vehiculos/VehiculoForm';
import OrdenesTable from './components/ordenes/OrdenesTable';
import OrdenForm from './components/ordenes/OrdenForm';
import {
  getClientes,
  createCliente as createClienteRequest,
  deleteCliente as deleteClienteRequest,
  getVehiculos,
  createVehiculo as createVehiculoRequest,
  deleteVehiculo as deleteVehiculoRequest,
  getOrdenes,
  createOrden as createOrdenRequest,
  deleteOrden as deleteOrdenRequest,
} from './services/api';
import './styles.css';

const initialClienteForm = {
  nombre: '',
  telefono: '',
  email: '',
};

const initialVehiculoForm = {
  placa: '',
  modelo: '',
  id_cliente: '',
};

const initialOrdenForm = {
  id_cliente: '',
  id_vehiculo: '',
  descripcion: '',
  fecha_ingreso: '',
  estado: 'Pendiente',
  total: '',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('clientes');
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [searchCliente, setSearchCliente] = useState('');
  const [searchVehiculo, setSearchVehiculo] = useState('');
  const [searchOrden, setSearchOrden] = useState('');
  const [clienteModalOpen, setClienteModalOpen] = useState(false);
  const [vehiculoModalOpen, setVehiculoModalOpen] = useState(false);
  const [ordenModalOpen, setOrdenModalOpen] = useState(false);
  const [clienteForm, setClienteForm] = useState(initialClienteForm);
  const [vehiculoForm, setVehiculoForm] = useState(initialVehiculoForm);
  const [ordenForm, setOrdenForm] = useState(initialOrdenForm);
  const [loadingClientes, setLoadingClientes] = useState(true);
  const [loadingVehiculos, setLoadingVehiculos] = useState(true);
  const [loadingOrdenes, setLoadingOrdenes] = useState(true);
  const [submittingCliente, setSubmittingCliente] = useState(false);
  const [submittingVehiculo, setSubmittingVehiculo] = useState(false);
  const [submittingOrden, setSubmittingOrden] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!toast.visible) return;

    const timeout = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [toast.visible]);

  const clientesMap = useMemo(() => {
    const map = new Map();

    clientes.forEach((cliente) => {
      const idCliente = cliente.id_cliente ?? cliente.id;
      if (idCliente !== null && idCliente !== undefined) {
        map.set(String(idCliente), cliente);
      }
    });

    return map;
  }, [clientes]);

  const vehiculosMap = useMemo(() => {
    const map = new Map();

    vehiculos.forEach((vehiculo) => {
      const idVehiculo = vehiculo.id_vehiculo ?? vehiculo.id_vehiculos ?? vehiculo.id;
      if (idVehiculo !== null && idVehiculo !== undefined) {
        map.set(String(idVehiculo), vehiculo);
      }
    });

    return map;
  }, [vehiculos]);

  const filteredClientes = useMemo(() => {
    const term = searchCliente.trim().toLowerCase();
    if (!term) return clientes;

    return clientes.filter((cliente) => {
      return [cliente.nombre, cliente.telefono, cliente.email]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term));
    });
  }, [clientes, searchCliente]);

  const filteredVehiculos = useMemo(() => {
    const term = searchVehiculo.trim().toLowerCase();
    if (!term) return vehiculos;

    return vehiculos.filter((vehiculo) => {
      const clienteId = vehiculo.id_cliente ?? vehiculo.cliente_id;
      const cliente = clientesMap.get(String(clienteId));

      return [
        vehiculo.placa,
        vehiculo.modelo,
        clienteId,
        cliente?.nombre,
        cliente?.telefono,
        cliente?.email,
      ]
        .filter((value) => value !== null && value !== undefined)
        .some((value) => String(value).toLowerCase().includes(term));
    });
  }, [vehiculos, searchVehiculo, clientesMap]);

  const filteredOrdenes = useMemo(() => {
    const term = searchOrden.trim().toLowerCase();
    if (!term) return ordenes;

    return ordenes.filter((orden) => {
      const cliente = clientesMap.get(String(orden.id_cliente));
      const vehiculo = vehiculosMap.get(String(orden.id_vehiculo));

      return [
        orden.id_orden,
        orden.id_cliente,
        orden.id_vehiculo,
        orden.descripcion,
        orden.estado,
        orden.fecha_ingreso,
        orden.total,
        cliente?.nombre,
        cliente?.telefono,
        cliente?.email,
        vehiculo?.placa,
        vehiculo?.modelo,
      ]
        .filter((value) => value !== null && value !== undefined)
        .some((value) => String(value).toLowerCase().includes(term));
    });
  }, [ordenes, searchOrden, clientesMap, vehiculosMap]);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
  };

  const loadAll = async () => {
    await Promise.all([loadClientes(), loadVehiculos(), loadOrdenes()]);
  };

  const loadClientes = async () => {
    try {
      setLoadingClientes(true);
      const data = await getClientes();
      setClientes(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast(`Error al cargar clientes: ${error.message}`, 'error');
    } finally {
      setLoadingClientes(false);
    }
  };

  const loadVehiculos = async () => {
    try {
      setLoadingVehiculos(true);
      const data = await getVehiculos();
      setVehiculos(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast(`Error al cargar vehículos: ${error.message}`, 'error');
    } finally {
      setLoadingVehiculos(false);
    }
  };

  const loadOrdenes = async () => {
    try {
      setLoadingOrdenes(true);
      const data = await getOrdenes();
      setOrdenes(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast(`Error al cargar órdenes: ${error.message}`, 'error');
    } finally {
      setLoadingOrdenes(false);
    }
  };

  const handleCreateCliente = async (event) => {
    event.preventDefault();

    try {
      setSubmittingCliente(true);
      await createClienteRequest(clienteForm);
      showToast('Cliente creado exitosamente');
      setClienteForm(initialClienteForm);
      setClienteModalOpen(false);
      await loadClientes();
    } catch (error) {
      showToast(`Error al crear cliente: ${error.message}`, 'error');
    } finally {
      setSubmittingCliente(false);
    }
  };

  const handleCreateVehiculo = async (event) => {
    event.preventDefault();

    try {
      setSubmittingVehiculo(true);
      await createVehiculoRequest({
        placa: vehiculoForm.placa.trim(),
        modelo: vehiculoForm.modelo.trim(),
        id_cliente: Number(vehiculoForm.id_cliente),
      });
      showToast('Vehículo creado exitosamente');
      setVehiculoForm(initialVehiculoForm);
      setVehiculoModalOpen(false);
      await loadVehiculos();
    } catch (error) {
      showToast(`Error al crear vehículo: ${error.message}`, 'error');
    } finally {
      setSubmittingVehiculo(false);
    }
  };

  const handleCreateOrden = async (event) => {
    event.preventDefault();

    try {
      setSubmittingOrden(true);
      await createOrdenRequest({
        id_cliente: Number(ordenForm.id_cliente),
        id_vehiculo: Number(ordenForm.id_vehiculo),
        descripcion: ordenForm.descripcion.trim(),
        fecha_ingreso: ordenForm.fecha_ingreso,
        estado: ordenForm.estado,
        total: Number(ordenForm.total),
      });
      showToast('Orden creada exitosamente');
      setOrdenForm(initialOrdenForm);
      setOrdenModalOpen(false);
      await loadOrdenes();
    } catch (error) {
      showToast(`Error al crear orden: ${error.message}`, 'error');
    } finally {
      setSubmittingOrden(false);
    }
  };

  const handleDeleteCliente = async (idCliente) => {
    const confirmed = window.confirm(
      '¿Estás seguro de eliminar este cliente? Se eliminarán también sus vehículos asociados.'
    );

    if (!confirmed) return;

    try {
      await deleteClienteRequest(idCliente);
      showToast('Cliente eliminado exitosamente');
      await Promise.all([loadClientes(), loadVehiculos(), loadOrdenes()]);
    } catch (error) {
      showToast(`Error al eliminar cliente: ${error.message}`, 'error');
    }
  };

  const handleDeleteVehiculo = async (idVehiculo) => {
    const confirmed = window.confirm('¿Estás seguro de eliminar este vehículo?');
    if (!confirmed) return;

    try {
      await deleteVehiculoRequest(idVehiculo);
      showToast('Vehículo eliminado exitosamente');
      await Promise.all([loadVehiculos(), loadOrdenes()]);
    } catch (error) {
      showToast(`Error al eliminar vehículo: ${error.message}`, 'error');
    }
  };

  const handleDeleteOrden = async (idOrden) => {
    const confirmed = window.confirm('¿Estás seguro de eliminar esta orden?');
    if (!confirmed) return;

    try {
      await deleteOrdenRequest(idOrden);
      showToast('Orden eliminada exitosamente');
      await loadOrdenes();
    } catch (error) {
      showToast(`Error al eliminar orden: ${error.message}`, 'error');
    }
  };

  return (
    <>
      <div className="app-shell">
        <div className="container">
          <header className="hero-header">
            <h1>
              <FaCar /> Taller Mecánico
            </h1>
            <p>Sistema de Gestión de Clientes, Vehículos y Órdenes</p>
          </header>

          <Tabs activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === 'clientes' && (
            <section className="tab-content active">
              <div className="section-header">
                <h2>
                  <FaUserPlus /> Registrar Nuevo Cliente
                </h2>
                <button className="btn-add" type="button" onClick={() => setClienteModalOpen(true)}>
                  <FaPlus /> Nuevo Cliente
                </button>
              </div>

              <SearchBar
                value={searchCliente}
                onChange={setSearchCliente}
                placeholder="Buscar cliente por nombre, teléfono o email..."
              />

              <ClientesTable
                clientes={filteredClientes}
                loading={loadingClientes}
                onDelete={handleDeleteCliente}
              />
            </section>
          )}

          {activeTab === 'vehiculos' && (
            <section className="tab-content active">
              <div className="section-header">
                <h2>
                  <FaPlusCircle /> Registrar Nuevo Vehículo
                </h2>
                <button className="btn-add" type="button" onClick={() => setVehiculoModalOpen(true)}>
                  <FaPlus /> Nuevo Vehículo
                </button>
              </div>

              <SearchBar
                value={searchVehiculo}
                onChange={setSearchVehiculo}
                placeholder="Buscar por placa, modelo o nombre del cliente..."
              />

              <VehiculosTable
                vehiculos={filteredVehiculos}
                clientes={clientes}
                loading={loadingVehiculos}
                onDelete={handleDeleteVehiculo}
              />
            </section>
          )}

          {activeTab === 'ordenes' && (
            <section className="tab-content active">
              <div className="section-header">
                <h2>
                  <FaWrench /> Registrar Nueva Orden
                </h2>
                <button className="btn-add" type="button" onClick={() => setOrdenModalOpen(true)}>
                  <FaPlus /> Nueva Orden
                </button>
              </div>

              <SearchBar
                value={searchOrden}
                onChange={setSearchOrden}
                placeholder="Buscar por cliente, vehículo, estado o descripción..."
              />

              <OrdenesTable
                ordenes={filteredOrdenes}
                clientes={clientes}
                vehiculos={vehiculos}
                loading={loadingOrdenes}
                onDelete={handleDeleteOrden}
              />
            </section>
          )}
        </div>
      </div>

      <Modal
        isOpen={clienteModalOpen}
        title="Registrar Cliente"
        icon={<FaUsers />}
        onClose={() => setClienteModalOpen(false)}
      >
        <ClienteForm
          form={clienteForm}
          setForm={setClienteForm}
          onSubmit={handleCreateCliente}
          loading={submittingCliente}
        />
      </Modal>

      <Modal
        isOpen={vehiculoModalOpen}
        title="Registrar Vehículo"
        icon={<FaTruck />}
        onClose={() => setVehiculoModalOpen(false)}
      >
        <VehiculoForm
          form={vehiculoForm}
          setForm={setVehiculoForm}
          onSubmit={handleCreateVehiculo}
          loading={submittingVehiculo}
          clientes={clientes}
        />
      </Modal>

      <Modal
        isOpen={ordenModalOpen}
        title="Registrar Orden"
        icon={<FaClipboardList />}
        onClose={() => setOrdenModalOpen(false)}
      >
        <OrdenForm
          form={ordenForm}
          setForm={setOrdenForm}
          onSubmit={handleCreateOrden}
          loading={submittingOrden}
          clientes={clientes}
          vehiculos={vehiculos}
        />
      </Modal>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </>
  );
}
