import { FaSave } from 'react-icons/fa';

export default function ClienteForm({ form, setForm, onSubmit, loading }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre completo *</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={form.telefono}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <button className="btn-submit" type="submit" disabled={loading}>
        <FaSave /> {loading ? 'Guardando...' : 'Guardar Cliente'}
      </button>
    </form>
  );
}
