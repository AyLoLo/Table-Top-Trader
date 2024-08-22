import React, { useEffect, useState } from "react"
import L from "leaflet";

import { MapContainer, TileLayer } from 'react-leaflet'
import { S3_URL, URL } from "../constants"

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';
import { MapMarkerGroup } from "./mapMarkerGroup";

export const Map = (props: any) => {
  const { onMarkerClick, posts, post, setPost } = props
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
      err => { setLoading(false); console.log(err); }
    );
  }, []);

  useEffect(() => {
    if (coords.longitude !== 0)
      setLoading(false);
  }, [coords]);


  const onZipUpdate = (e: any) => {
    fetch(`${URL}predict?code=${e.target.value}`)
      .then(resp => resp.json())
      .then(resp => setZipcodes(resp))
      .catch(err => console.error(err));
  }

  const onSubmitZip = (e: any) => {
    console.log("submitting zipcode", e.target.value);

    fetch(`${URL}zipcode?code=${e.target.value}`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      })
      .then(resp => {
        if (resp)
          setCoords({ longitude: resp.longitude, latitude: resp.latitude })
      })
      .catch(err => console.error(err));
  }

  return (
    loading ?
      <div>loading</div> :
      <>
        <input
          className="border-2 bg-clip-padding border-opacity-80 rounded border-gray-300 border-solid p-1 top-24 left-20 w-40 h-12 z-50 absolute"
          placeholder="zipcode"
          list="zipcodes"
          onKeyDown={(e) => e.key === 'Enter' && onSubmitZip(e)}
          onChange={onZipUpdate} />

        <datalist id="zipcodes">
          {zipcodes.map(code =>
            <option
              key={code}
              value={code}
              onClick={onSubmitZip}
            />
          )}
        </datalist>

        <MapContainer
          className={`h-screen z-10 relative`}
          center={[coords.latitude, coords.longitude]}
          zoom={zoomLevel}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapMarkerGroup
            posts={posts}
            onMarkerClick={onMarkerClick}
            coords={coords}
            setPost={setPost}
          />

        </MapContainer>
      </>
  )
}