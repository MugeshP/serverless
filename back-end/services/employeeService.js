const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const EMPLOYEES_TABLE = process.env.EMPLOYEES_TABLE;

const employeeService = {
  getAll: async () => {
    const result = await dynamoDb.scan({ TableName: EMPLOYEES_TABLE }).promise();
    return result.Items;
  },

  getById: async (id) => {
    const result = await dynamoDb.get({
      TableName: EMPLOYEES_TABLE,
      Key: { id }
    }).promise();
    return result.Item;
  },

  create: async (employeeData) => {
    const employee = {
      id: Date.now().toString(),
      ...employeeData,
      createdAt: new Date().toISOString()
    };

    await dynamoDb.put({
      TableName: EMPLOYEES_TABLE,
      Item: employee
    }).promise();

    return employee;
  },

  update: async (id, employeeData) => {
    const { name, email, position, salary } = employeeData;

    await dynamoDb.update({
      TableName: EMPLOYEES_TABLE,
      Key: { id },
      UpdateExpression: 'SET #name = :name, email = :email, #position = :position, salary = :salary, updatedAt = :updatedAt',
      ExpressionAttributeNames: { '#name': 'name', '#position': 'position' },
      ExpressionAttributeValues: {
        ':name': name,
        ':email': email,
        ':position': position,
        ':salary': salary,
        ':updatedAt': new Date().toISOString()
      }
    }).promise();

    return { id, name, email, position, salary };
  },

  delete: async (id) => {
    await dynamoDb.delete({
      TableName: EMPLOYEES_TABLE,
      Key: { id }
    }).promise();
  }
};

module.exports = employeeService;