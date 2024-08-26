/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { MouseEventHandler, useEffect } from "react"
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Marker, Popup, useMap } from 'react-leaflet'
import { S3_URL } from "../constants"


export const MapMarkerGroup = (props: {
  posts: any,
  mapCoords: any,
  setPost: MouseEventHandler<HTMLAnchorElement>
  setPanelAnimation: Function
}) => {
  const {
    posts,
    mapCoords,
    setPost,
    setPanelAnimation
  } = props

  const map = useMap();

  useEffect(() => {
    map.flyTo([mapCoords.latitude, mapCoords.longitude], 15)
  }, [map, mapCoords]);

  return (
    <MarkerClusterGroup
      chunkedLoading
    >
      {posts && posts.map((post: any) => {
        const {
          latitude,
          longitude,
          title,
          description,
          date_created,
          price,
          user,
          images,
        } = post;
        const date = new Date(date_created).toLocaleString();
        return (
          <Marker
            key={date_created + title + latitude + longitude}
            position={[latitude, longitude]}
          >
            <Popup>
              {images?.length > 0 &&
                <img src={`${S3_URL}${images[0].post_image_key}`} alt="board game post thumbnail" />
              }
              <a href="#post" onClick={() => {
                setPost(post);
                setPanelAnimation({ hide: false, show: true });
              }} className="font-bold text-lg">
                {title}
              </a>
              <p>
                {user.username}
              </p>
              <p>
                ${price}
              </p>
              <p>
                {description.length > 150
                  ? `${description.substring(0, 150)}...`
                  : description}
              </p>
              <p>
                Posted on: {date}
              </p>
            </Popup>
          </Marker>
        );
      })}
    </MarkerClusterGroup>
  )
}