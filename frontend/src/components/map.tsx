import React, { useEffect, useState } from "react"
import L from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { S3_URL, URL } from "../constants"

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';


export const Map = (props: any) => {
  const { onMarkerClick, posts } = props

  const [coords, setCoords] = useState({ longitude: 0, latitude: 0 })
  const [zoomLevel, setZoomLevel] = useState(10);
  const [loading, setLoading] = useState(true)
  const [zipcodes, setZipcodes] = useState([])

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

  const onZipUpdate = (e: any) => {
    if (e.key === 'Enter') {
      console.log('do validate');
      onSubmitZip(e);
    }
    fetch(`${URL}predict?code=${e.target.value}`)
      .then(resp => resp.json())
      .then(resp => setZipcodes(resp))
      .catch(err => console.error(err));
  }
  const onSubmitZip = (e: any) => {

    console.log("submitting zipcode", e.target.value)
    fetch(`${URL}zipcode?code=${e.target.value}`)
      .then(resp => resp.json())
      .then(resp => setCoords({ longitude: resp.longitude, latitude: resp.latitude }))
      .catch(err => console.error(err));
  }

  return (
    loading ?
      <div>loading</div> :
      <>
        <input className="p-1 top-24 left-20 w-40 h-12 z-50 absolute " placeholder="zipcode" list="zipcodes" onSubmit={onSubmitZip} onChange={onZipUpdate} />
        <datalist id="zipcodes">
          {zipcodes.map(code => <option value={code} onClick={onSubmitZip} />)}
        </datalist>
        <MapContainer className="h-screen w-9/12 z-10 relative" center={[coords.latitude, coords.longitude]} zoom={zoomLevel} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MarkerClusterGroup
            chunkedLoading
            onClick={(e) => { console.log("hello world", e); }}
          >
            {zoomLevel > 10 && posts.map((posts: any) => {
              const {
                latitude,
                longitude,
                title,
                description,
                date_created,
                price,
                user,
                images,
              } = posts;
              const date = new Date(date_created).toLocaleString();
              return (
                <Marker
                  position={[latitude, longitude]}
                  eventHandlers={{ click: onMarkerClick }}
                >
                  <Popup>
                    {images?.length > 0 &&
                      <img src={`${S3_URL}${images[0].post_image_key}`} alt="board game post thumbnail" />
                    }

                    <h2 className="font-bold text-lg">{title}</h2>
                    <p>{user.username}</p>
                    <p>${price}</p>
                    <p>{description.length > 150
                      ? `${description.substring(0, 150)}...`
                      : description}</p>
                    <p>Posted on: {date}</p>
                  </Popup>
                </Marker>

              );
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </>

  )
}