import { createClient } from 'redis';

let client;
let isConnected = false;

async function getRedisClient() {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });
    client.on('error', err => console.error('Redis Client Error', err));
  }
  
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  
  return client;
}

export async function getOrSetCache(key, cb, ttl = 3600) {
  const client = await getRedisClient();
  
  try {
    const cached = await client.get(key);
    if (cached) return JSON.parse(cached);
    
    const freshData = await cb();
    await client.setEx(key, ttl, JSON.stringify(freshData));
    return freshData;
  } catch (err) {
    console.error('Cache error:', err);
    return cb(); // Fallback to original function
  }
}
// import { createClient } from 'redis';

// let client;

// async function getRedisClient() {
//   if (!client) {
//     client = createClient({
//       url: process.env.REDIS_URL || 'redis://localhost:6379'
//     });
//     client.on('error', err => console.error('Redis error:', err));
//     await client.connect();
//   }
//   return client;
// }

// export async function getOrSetCache(key, cb, ttl = 3600) {
//   const client = await getRedisClient();
//   const cached = await client.get(key);
//   if (cached) return JSON.parse(cached);
  
//   const freshData = await cb();
//   await client.setEx(key, ttl, JSON.stringify(freshData));
//   return freshData;
// }