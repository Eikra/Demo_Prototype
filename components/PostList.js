import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function PostList() {
  const { data: posts, error } = useSWR('/api/posts', fetcher);

  if (error) return <div>Failed to load posts</div>;
  if (!posts) return <div>Loading posts...</div>;

  return (
    <div>
      <h2>Client-Side Posts</h2>
      <ul>
        {posts.slice(0, 5).map(post => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
// import useSWR from 'swr';

// const fetcher = url => fetch(url).then(res => res.json());

// export default function PostList() {
//   const { data: posts, error } = useSWR(
//     '/api/posts', 
//     fetcher,
//     { revalidateOnFocus: false }
//   );

//   if (error) return <div>Failed to load</div>;
//   if (!posts) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Client-Side Rendered Posts</h2>
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }