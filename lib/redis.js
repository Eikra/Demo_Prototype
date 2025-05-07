import { createClient } from 'redis';

let client;
let isConnected = false;

async function getRedisClient() {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 100, 3000), // Exponential backoff
      },
    });
    client.on('error', (err) => console.error('Redis Client Error:', err));
    client.on('reconnecting', () => console.log('Redis reconnecting...'));
  }

  if (!isConnected) {
    try {
      await client.connect();
      isConnected = true;
    } catch (err) {
      console.error('Redis connection failed:', err);
      throw err;
    }
  }

  return client;
}

export async function getOrSetCache(key, cb, ttl = 3600) {
  const client = await getRedisClient();

  try {
    const cached = await client.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    const freshData = await cb();
    await client.setEx(key, ttl, JSON.stringify(freshData));
    return freshData;
  } catch (err) {
    console.error('Cache error:', err);
    // Fallback to callback without caching
    return cb();
  }
}