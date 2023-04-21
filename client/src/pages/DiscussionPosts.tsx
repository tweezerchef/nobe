import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

interface Post {
  id: string;
  body: string;
  userId: string;
  discussionId: string;
}

function DiscussionPosts() {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  console.log(posts);

  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get(`/api/clubs/${id}/posts`);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (id) {
      getPosts();
    }
  }, []);

  return (
    <div>
      <h1>Discussion Posts</h1>
      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.body}</h2>
          {/* <p>userId: {post.userId}</p> */}
        </div>
      ))}
    </div>
  );
}

export default DiscussionPosts;