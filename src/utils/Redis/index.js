const { createClient } = require('redis');
const config = {
  socker: {
    host: 'http://localhost',
    port: 6379,
  },
};

const client = createClient(config);

client.connect().then(() => {
  console.log('Redis client connected');
});

const storeToken = async (token, username) => {
  await client.set(token, username, {
    EX: 60 * 60 * 24 * 7, // 7 days
  });
};

const getToken = async (token) => {
  const username = await client.get(token);
  return username;
};

const RedisServices = { storeToken, getToken };
module.exports = RedisServices;
