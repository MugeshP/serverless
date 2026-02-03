import React from 'react';

const EmployeeForm = ({ form, setForm, editId, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="form">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Position"
        value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Salary"
        value={form.salary}
        onChange={(e) => setForm({ ...form, salary: e.target.value })}
        required
      />
      <button type="submit">{editId ? 'Update' : 'Add'} Employee</button>
      {editId && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default EmployeeForm;