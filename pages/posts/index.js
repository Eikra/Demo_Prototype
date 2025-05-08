import Link from 'next/link';
import { getOrSetCache } from '../../lib/redis';

// Default pagination limit from environment variable
const DEFAULT_LIMIT = parseInt(process.env.DEFAULT_POSTS_LIMIT || '10', 10);

export default function PostsPage({ posts, page, totalPages, limit }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Posts (SSR with Pagination)</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between">
        <div>
          {page > 1 && (
            <Link href={`/posts?page=${page - 1}&limit=${limit}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Previous
            </Link>
          )}
        </div>

        <div>
          {page < totalPages && (
            <Link href={`/posts?page=${page + 1}&limit=${limit}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Next
            </Link>
          )}
        </div>

        
      </div>
      <p className="mt-4">
        Page {page} of {totalPages} (Showing {posts.length} of {limit} posts per page)
      </p>
    </div>
  );
}

export async function getStaticProps({ query }) {
  const page = parseInt(query?.page || '1', 10);
  const limit = parseInt(query?.limit || DEFAULT_LIMIT, 10);
  const start = (page - 1) * limit;

  const cacheKey = `posts:page:${page}:limit:${limit}`;

  const posts = await getOrSetCache(cacheKey, async () => {
    const response = await fetch(`${process.env.API_BASE_URL}/posts`);
    const allPosts = await response.json();
    const paginatedPosts = allPosts.slice(start, start + limit) || [];
    return paginatedPosts;
  });

  const totalPosts = 100; // JSONPlaceholder has 100 posts
  const totalPages = Math.ceil(totalPosts / limit);

  return {
    props: {
      posts: Array.isArray(posts) ? posts : [], // Ensure posts is an array
      page,
      limit,
      totalPages,
    },
    revalidate: 60, // ISR: Revalidate every 60 seconds
  };
}
// import Link from 'next/link';
// import { getOrSetCache } from '../../lib/redis';

// export async function getStaticProps() {
//   const posts = await getOrSetCache('all-posts', async () => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     return await res.json();
//   }, 60 * 60); // 1 hour cache

//   return {
//     props: { posts },
//     revalidate: 60 * 60, // Revalidate every hour (ISR)
//   };
// }

// export default function PostsPage({ posts }) {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Posts (Server-Side Rendered)</h1>

//       {/* <ul>
//         {posts.map(post => (
//           <li key={post.id}>
//             <a href={`/posts/${post.id}`}>{post.title}</a>
//           </li>
//         ))}
//       </ul> */}

//       <ul className="space-y-2">
//         {posts.slice(0, 10).map((post) => (
//           <li key={post.id}>
//             <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
//               {post.title}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       {posts.length > 10 && (
//         <p className="mt-4 text-gray-600">Showing first 10 posts. Implement pagination for more.</p>
//       )}
//     </div>
//   );
// }


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