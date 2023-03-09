const { createClient } = require('redis');
const config = {
  socket: {
    host: 'redis',
    port: 6379,
  },
};

const client = createClient(config);

client.connect().then(() => {
  console.log('Redis client connected');
});

const storeToken = async (token, email) => {
  await client.set(token, email, {
    EX: 60 * 60 * 24 * 7, // 7 days
  });
};

const getToken = async (token) => {
  const email = await client.get(token);
  return email;
};

const RedisServices = { storeToken, getToken };
module.exports = RedisServices;
