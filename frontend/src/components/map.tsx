import React, { useEffect, useState } from "react"
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

export const Map = (props: any) => {
  const { onMarkerClick } = props

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


  return (
    loading ?
      <div>loading</div> :
      <MapContainer className="h-screen w-9/12" center={[coords.latitude, coords.longitude]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[coords.latitude, coords.longitude]}
          eventHandlers={{
            click: onMarkerClick
          }}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

  )
}