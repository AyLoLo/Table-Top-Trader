import React, { useEffect, useState } from "react";
import { PostsMap } from "../components/postsMap"
import { MapSidePanel } from "../components/postsMap/mapSidePanel";
import { URL } from "../constants"
const PostMap = () => {
  const [mapCoords, setMapCoords] = useState({
    longitude: 0,
    latitude: 0
  });
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState(null)
  const [panelAnimation, setPanelAnimation] = useState({ hide: false, show: false })

  const getNearbyPosts = (long: number, lat: number) => {
    fetch(`${URL}get-by-loc?lon=${long}&lat=${lat}`)
      .then(response => response.json())
      .then(response => {
        setPosts(response)
      }).catch(error => console.error(error));
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setMapCoords({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        getNearbyPosts(position.coords.longitude, position.coords.latitude)
      },
      err => { setLoading(false); console.log(err); }
    );
  }, []);

  return (
    <div>
      <PostsMap
        posts={posts}
        post={post}
        mapCoords={mapCoords}
        setMapCoords={setMapCoords}
        setPost={setPost}
        loading={loading}
        setLoading={setLoading}
        setPanelAnimation={setPanelAnimation}
        getNearbyPosts={getNearbyPosts}
      />
      <MapSidePanel
        post={post}
        setPanelAnimation={setPanelAnimation}
        panelAnimation={panelAnimation}
      />
    </div>
  );
};

export default PostMap;