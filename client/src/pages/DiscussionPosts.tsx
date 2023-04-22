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
  const [newPost, setNewPost] = useState("");
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
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const { data } = await axios.post(`/api/clubs/${id}/posts`, {
        userId: user.id,
        body: newPost,
      });
      setPosts([...posts, data]);
      setNewPost("");
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <h1>Discussion Posts</h1>
      {posts?.map((post) => (
        <div key={post.id}>
          <h3>{post.body}</h3>
          {/* <p>userId: {post.userId}</p> */}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea
          value={newPost}
          onChange={(event) => setNewPost(event.target.value)}
          placeholder="Write a new post"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default DiscussionPosts;