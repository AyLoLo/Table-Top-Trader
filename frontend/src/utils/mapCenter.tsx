import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

export const MapCenter = (props: {
  setZoom: Function,
  getNearbyPosts: Function,
  setMapCoords: Function,
  zoomLevel: number,
  posts: any,
  mapCoords: any,
}) => {

  const {
    getNearbyPosts,
    zoomLevel,
    setZoom,
    setMapCoords,
    posts,
    mapCoords
  } = props;

  const m = useMap();

  useEffect(() => {
    const flyToMap = () => {
      m.flyTo([mapCoords.latitude, mapCoords.longitude], zoomLevel);
    }
    flyToMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, mapCoords]);

  const map = useMapEvents({
    dragend() {
      const center = map.getCenter();
      setMapCoords({ latitude: center.lat, longitude: center.lng });
      getNearbyPosts && getNearbyPosts(center.lng, center.lat);
      map.flyTo([center.lat, center.lng], zoomLevel);
    },
    zoom() {
      const zoom = map.getZoom();
      setZoom(zoom);
    }
  });

  return null;
}