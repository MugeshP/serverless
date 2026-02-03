import axios from 'axios';

const API_URL = 'https://cnnimirejh.execute-api.us-east-1.amazonaws.com/dev';

export const employeeService = {
  getAll: () => axios.get(`${API_URL}/employees`),
  getById: (id) => axios.get(`${API_URL}/employees/${id}`),
  create: (employee) => axios.post(`${API_URL}/employees`, employee),
  update: (id, employee) => axios.put(`${API_URL}/employees/${id}`, employee),
  delete: (id) => axios.delete(`${API_URL}/employees/${id}`)
};