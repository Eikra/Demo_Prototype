import Link from 'next/link';
import { getOrSetCache } from '../../lib/redis';

export async function getStaticProps() {
  const posts = await getOrSetCache('all-posts', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return await res.json();
  }, 60 * 60); // 1 hour cache

  return {
    props: { posts },
    revalidate: 60 * 60, // Revalidate every hour (ISR)
  };
}

export default function PostsPage({ posts }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Posts (Server-Side Rendered)</h1>

      {/* <ul>
        {posts.map(post => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul> */}

      <ul className="space-y-2">
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      {posts.length > 10 && (
        <p className="mt-4 text-gray-600">Showing first 10 posts. Implement pagination for more.</p>
      )}
    </div>
  );
}


// import { getOrSetCache } from '../../lib/redis';

// export async function getServerSideProps() {
//   const posts = await getOrSetCache('all-posts', async () => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     return await res.json();
//   }, 60 * 60); // 1 hour cache

//   return { props: { posts } };
// }

// export default function PostsPage({ posts }) {
//   return (
//     <div>
//       <h1>Posts (Server-Side Rendered)</h1>
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