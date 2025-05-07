import { getOrSetCache } from '../../lib/redis';

export default async function handler(req, res) {
  const posts = await getOrSetCache('api:posts', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
  });
  
  res.status(200).json(posts);
}