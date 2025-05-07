import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: post, error } = useSWR(
    id ? `/api/posts/${id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}