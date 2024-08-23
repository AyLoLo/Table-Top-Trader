import React, { useEffect, useState, useTransition } from "react";
import L from "leaflet";
import { Map } from "../components/map"
import { MapSidePanel } from "../components/mapSidePanel";
import { URL } from "../constants"
const PostMap = () => {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState(null)
  const [hideSidePanel, setHideSidePanel] = useState(true)
  const [isPendingOpen, startOpenPanelTransition] = useTransition();
  const [isPendingClose, startClosePanelTransition] = useTransition();

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
  const setHideSidePanelAnimated = () => {
    startOpenPanelTransition(() => {
      
    })
  }

  return (
    <div>
      <div className="">
        <Map
          onMarkerClick={onMarkerClick}
          posts={posts}
          post={post}
          setPost={setPost}
          setHideSidePanel={setHideSidePanel}
        />
        <MapSidePanel
          post={post}
          setHideSidePanel={setHideSidePanel}
          hideSidePanel={hideSidePanel}
          startClosePanelTransition={startClosePanelTransition}
          isPendingClose={isPendingClose}
          isPendingOpen={isPendingOpen}
        />
      </div>
    </div>
  );
};

export default PostMap;