import React, { useEffect, useState } from "react";
import { Map } from "../components/map"
import L from "leaflet";

const PostMap = () => {
  useEffect(() => {

  }, [])
  const onMarkerClick: L.LeafletMouseEventHandlerFn = (e: L.LeafletMouseEvent) => {
    console.log("marker is clicked", e);
  }

  return (
    <div className="flex flex-wrap">
      <Map
        onMarkerClick={onMarkerClick}
      />
      <div className=".w-3/12">laksdjfalsjdf</div>
    </div>
  );
};

export default PostMap;