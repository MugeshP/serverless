import React from 'react';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <p>Email: {employee.email}</p>
      <p>Position: {employee.position}</p>
      <p>Salary: ${employee.salary}</p>
      <button onClick={() => onEdit(employee)}>Edit</button>
      <button onClick={() => onDelete(employee.id)}>Delete</button>
    </div>
  );
};

export default EmployeeCard;