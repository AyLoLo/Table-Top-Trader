import React, { useState, useEffect } from "react"
import { Post } from "components/post"
import { Pagination } from "components/pagination"
import { URL } from "../constants"


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${URL}posts`)
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts()
  }, []);

  const post = posts.map((post: any) => {
    return <Post post={post} loading={loading} key={post.post_id} />
  })

  return (
    <div className="bg-hero-background bg-center bg-no-repeat bg-over">
      {post}
      <Pagination posts={posts} />
    </div>
  )
}

export default Posts;