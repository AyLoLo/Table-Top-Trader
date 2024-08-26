import { useMapEvents } from "react-leaflet";

export const MapCenter = (props: { setMapCoords: Function, setDraggedCoords: Function }) => {
  const { setDraggedCoords } = props;

  const map = useMapEvents({
    dragend() {
      map.locate();
    },
    locationfound(e) {
      console.log(e)
      setDraggedCoords({ latitude: e.latlng.lat, longitude: e.latlng.lng });
    }
  });

  return null;
}