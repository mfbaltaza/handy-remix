import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPostListings } from "~/models/post.server";

// We create the type of LoaderData
// We wait for the await response in order for the data being available to use
// We generate the type of LoaderData based on the type of getPosts
type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListings>>;
};

// We set our loader as a LoaderFunction
export const loader: LoaderFunction = async () => {
  const posts = await getPostListings();
  // We pass the LoaderData to our JSON Generic
  return json<LoaderData>({ posts });
};

// Posts
export default () => {
  // And we typecast useLoaderData to the LoaderData
  const { posts } = useLoaderData() as LoaderData;

  return (
    <main>
      <h1>Posts</h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      {/* Here we render a list element per blog post to move to that route */}
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
