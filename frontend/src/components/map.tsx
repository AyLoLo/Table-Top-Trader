import React, { useEffect, useState } from "react"
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

export const Map = (props: any) => {
  const { onMarkerClick, posts } = props

  const [coords, setCoords] = useState({ longitude: 0, latitude: 0 })
  const [loading, setLoading] = useState(true)

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCoords({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      err => console.log(err)
    );
  }, []);

  useEffect(() => {
    if (coords.longitude !== 0)
      setLoading(false);
  }, [coords]);

  // function onMarkerClick(event: LeafletMouseEvent): void {
  //   throw new Error("Function not implemented.");
  // }
  // [coords.latitude, coords.longitude]

  return (
    loading ?
      <div>loading</div> :
      <MapContainer className="h-screen w-9/12" center={[40.7420540000, -73.7694170000]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* TODO: POST TYPE */}
        {posts.map((post: {
          title: string; latitude: number; longitude: number;
        }) =>
          <Marker
            position={[post.latitude, post.longitude]}
            eventHandlers={{ click: onMarkerClick }}
          >
            <Popup>
              {post.title}
              <p>{post.description}</p>
              <p>{post.date_created}</p>
            </Popup>
          </Marker>
        )}

      </MapContainer >

  )
}