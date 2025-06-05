import React, { useState } from "react";

export default function AdminCRUD() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", email: "" });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setAdmins(admins.map(a => (a.id === form.id ? form : a)));
      setEditMode(false);
    } else {
      setAdmins([...admins, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: "", email: "" });
  };

  const handleEdit = (admin) => {
    setForm(admin);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    setAdmins(admins.filter(admin => admin.id !== id));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Panel de Administradores
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editMode ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="border p-2">{admin.name}</td>
              <td className="border p-2">{admin.email}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(admin)}
                  className="bg-yellow-400 px-2 py-1 rounded text-white"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(admin.id)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {admins.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No hay administradores registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}