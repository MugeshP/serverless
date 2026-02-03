const serverConfig = {
  routes: {
    cors: {
      origin: ['*'],
      headers: ['Accept', 'Content-Type', 'Authorization', 'X-Requested-With'],
      additionalHeaders: [
        'X-Amz-Date',
        'X-Api-Key',
        'X-Amz-Security-Token',
        'X-Amz-User-Agent'
      ],
      credentials: true
    }
  }
};

module.exports = serverConfig;