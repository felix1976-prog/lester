const SERVER_HOSTNAME = process.env.API_URL || 'http://localhost:3005/api';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  server: SERVER,
};

export default config;
