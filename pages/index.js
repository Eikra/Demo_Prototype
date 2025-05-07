import PostList from '../components/PostList';

export default function Home() {
  return (
    <div>
      <h1>Next.js Redis Demo</h1>
      <section>
        <h2>Server-Side Rendered Content</h2>
        <a href="/posts">View Posts (SSR)</a>
      </section>
      <section>
        <h2>Client-Side Rendered Content</h2>
        <PostList />
      </section>
    </div>
  );
}