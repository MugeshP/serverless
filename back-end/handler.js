const Hapi = require('@hapi/hapi');
const serverless = require('serverless-http');
const serverConfig = require('./config/serverConfig');
const employeeRoutes = require('./routes/employeeRoutes');

let cachedServer;

const createServer = async () => {
  const server = Hapi.server(serverConfig);

  employeeRoutes.forEach(route => {
    server.route(route);
  });

  await server.initialize();
  return server;
};

module.exports.server = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await createServer();
  }
  return serverless(cachedServer)(event, context);
};
