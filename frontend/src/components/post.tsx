import React, {useState, useEffect} from "react";
import { URL } from "./constants"

function Post() {

    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        fetch(`${URL}posts`)
        .then(response => response.json())
        .then(postData => setPosts(postData))
    }, [])

    return (
        <div>
            empty spaces
        </div>
    )
}

export default Post;