import React, { useEffect, useState } from "react";
import L from "leaflet";
import { Map } from "../components/map"
import { MapSidebar } from "../components/mapSidebar";
import { URL } from "../constants"
const PostMap = () => {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch(`${URL}posts`)
      .then(response => response.json())
      .then(response => {
        setPosts(response)
      }).catch(error => console.error(error));
  }, []);

  const onMarkerClick: L.LeafletMouseEventHandlerFn = (e: L.LeafletMouseEvent) => {
    console.log("marker is clicked", e);
  }

  return (
    <div>
      <div className="">
        <Map
          onMarkerClick={onMarkerClick}
          posts={posts}
          post={post}
          setPost={setPost}
        />
        <MapSidebar posts={posts} post={post} />
      </div>
    </div>
  );
};

export default PostMap;