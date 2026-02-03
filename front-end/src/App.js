import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeForm from './components/EmployeeForm.jsx';
import EmployeeList from './components/EmployeeList.jsx';
import { employeeService } from './services/employeeService';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', position: '', salary: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getAll();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await employeeService.update(editId, form);
        setEditId(null);
      } else {
        await employeeService.create(form);
      }
      setForm({ name: '', email: '', position: '', salary: '' });
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setForm({ name: employee.name, email: employee.email, position: employee.position, salary: employee.salary });
    setEditId(employee.id);
  };

  const handleDelete = async (id) => {
    try {
      await employeeService.delete(id);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ name: '', email: '', position: '', salary: '' });
  };

  return (
    <div className="App">
      <h1>Employee Management</h1>
      
      <EmployeeForm
        form={form}
        setForm={setForm}
        editId={editId}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <EmployeeList
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;