const employeeService = require('../services/employeeService');

const employeeRoutes = [
  {
    method: 'GET',
    path: '/employees',
    handler: async () => {
      try {
        return await employeeService.getAll();
      } catch (error) {
        throw error;
      }
    }
  },

  {
    method: 'GET',
    path: '/employees/{id}',
    handler: async (request, h) => {
      try {
        const employee = await employeeService.getById(request.params.id);
        if (!employee) {
          return h.response({ error: 'Employee not found' }).code(404);
        }
        return employee;
      } catch (error) {
        return h.response({ error: error.message }).code(500);
      }
    }
  },

  {
    method: 'POST',
    path: '/employees',
    handler: async (request, h) => {
      try {
        const employee = await employeeService.create(request.payload);
        return h.response(employee).code(201);
      } catch (error) {
        return h.response({ error: error.message }).code(500);
      }
    }
  },

  {
    method: 'PUT',
    path: '/employees/{id}',
    handler: async (request, h) => {
      try {
        const employee = await employeeService.update(request.params.id, request.payload || {});
        return employee;
      } catch (error) {
        return h.response({ error: error.message }).code(500);
      }
    }
  },

  {
    method: 'DELETE',
    path: '/employees/{id}',
    handler: async (request, h) => {
      try {
        await employeeService.delete(request.params.id);
        return h.response({ message: 'Employee deleted successfully' }).code(200);
      } catch (error) {
        return h.response({ error: error.message }).code(500);
      }
    }
  }
];

module.exports = employeeRoutes;