import React, {useState, useEffect} from "react"
import {PostProp} from "interfaces/PostProp"
import {Post} from "components/post"

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

export const Posts = (posts: PostProp[], loading : boolean) => {

    const post = posts.map((post) => {
        return <Post post={post} loading={loading} key={post.id}/>
    })

    return(
        <div>
            {post}
        </div>
    )
}
