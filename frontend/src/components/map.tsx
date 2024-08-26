import React, { useEffect, useState } from "react"
import L from "leaflet";
import { MapContainer, TileLayer } from 'react-leaflet'
import { MapCenter } from "../utils/mapCenter"
import { URL } from "../constants"

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';
import { MapMarkerGroup } from "./mapMarkerGroup";

export const Map = (props: any) => {

  const {
    posts,
    setPost,
    setPanelAnimation,
    mapCoords,
    setMapCoords,
    loading,
    setLoading,
    styles,
    setDraggedCoords,
    draggedCoords
  } = props

  const zoomLevel = 10;

  const [zipcodes, setZipcodes] = useState([])

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  useEffect(() => {
    if (mapCoords.longitude !== 0)
      setLoading(false);
  }, [mapCoords, setLoading]);


  const onZipUpdate = (e: any) => {
    fetch(`${URL}predict?code=${e.target.value}`)
      .then(resp => resp.json())
      .then(resp => setZipcodes(resp))
      .catch(err => console.error(err));
  }

  const onSubmitZip = (e: any) => {
    fetch(`${URL}zipcode?code=${e.target.value}`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      })
      .then(resp => {
        if (resp)
          setMapCoords({
            longitude: resp.longitude,
            latitude: resp.latitude
          });
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
          className={`h-screen z-10 relative ${styles}`}
          center={[mapCoords.latitude, mapCoords.longitude]}
          zoom={zoomLevel}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapCenter setMapCoords={setMapCoords} setDraggedCoords={setDraggedCoords} />
          <MapMarkerGroup
            posts={posts}
            mapCoords={mapCoords}
            setPost={setPost}
            setPanelAnimation={setPanelAnimation}
          />

        </MapContainer >
      </>
  )
}