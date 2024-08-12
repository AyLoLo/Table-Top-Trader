import React from 'react';
import Post from '../components/post'

function Posts({posts, loading}){

    const post = posts.map(post => {
        return <Post post={post} loading={loading} key={post.id}/>
    })

    return(
        <div>
            {post}
        </div>
    )
}

export default Posts;