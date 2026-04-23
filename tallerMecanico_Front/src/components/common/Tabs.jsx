import { FaClipboardList, FaTruck, FaUsers } from 'react-icons/fa';

export default function Tabs({ activeTab, onChange }) {
  return (
    <div className="tabs">
      <button
        className={`tab-btn ${activeTab === 'clientes' ? 'active' : ''}`}
        type="button"
        onClick={() => onChange('clientes')}
      >
        <FaUsers /> Clientes
      </button>

      <button
        className={`tab-btn ${activeTab === 'vehiculos' ? 'active' : ''}`}
        type="button"
        onClick={() => onChange('vehiculos')}
      >
        <FaTruck /> Vehículos
      </button>

      <button
        className={`tab-btn ${activeTab === 'ordenes' ? 'active' : ''}`}
        type="button"
        onClick={() => onChange('ordenes')}
      >
        <FaClipboardList /> Órdenes
      </button>
    </div>
  );
}
