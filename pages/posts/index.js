import { getOrSetCache } from '../../lib/redis';

export async function getServerSideProps() {
  const posts = await getOrSetCache('all-posts', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return await res.json();
  }, 60 * 60); // 1 hour cache

  return { props: { posts } };
}

export default function PostsPage({ posts }) {
  return (
    <div>
      <h1>Posts (Server-Side Rendered)</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
// import { getOrSetCache } from '../../lib/redis';

// export async function getServerSideProps() {
//   const posts = await getOrSetCache('posts', async () => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     return res.json();
//   });

//   return { props: { posts } };
// }

// export default function PostsPage({ posts }) {
//   return (
//     <div>
//       <h1>Posts (SSR with Redis Cache)</h1>
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}>
//             <a href={`/posts/${post.id}`}>{post.title}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }