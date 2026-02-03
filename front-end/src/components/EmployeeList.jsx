import React from 'react';
import EmployeeCard from './EmployeeCard.jsx';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="employees">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EmployeeList;