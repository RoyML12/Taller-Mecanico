import { FaTrash } from 'react-icons/fa';

export default function ClientesTable({ clientes, loading, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="loading">Cargando clientes...</td>
            </tr>
          ) : clientes.length === 0 ? (
            <tr>
              <td colSpan="5" className="loading">No hay clientes registrados</td>
            </tr>
          ) : (
            clientes.map((cliente) => {
              const idCliente = cliente.id_cliente ?? cliente.id;

              return (
                <tr key={idCliente}>
                  <td>{idCliente}</td>
                  <td><strong>{cliente.nombre}</strong></td>
                  <td>{cliente.telefono || '-'}</td>
                  <td>{cliente.email || '-'}</td>
                  <td>
                    <button className="btn-delete" type="button" onClick={() => onDelete(idCliente)}>
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
