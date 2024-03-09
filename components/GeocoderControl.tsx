import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import { MAPBOX_TOKEN } from "./MapContainer";
import { useGlobalContext } from "@/context/GlobalContext";

const GeocoderControl = () => {
  interface GeoControlResults {
    result: {
      center: [number, number];
    }
  }

  // Actualizar las coordenadas con los resultados del Geocoder
  const {updateCoords} = useGlobalContext();

  useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        marker: true,
        zoom: 4,
        placeholder: "Search location...",
        accessToken: MAPBOX_TOKEN
      });

      ctrl.on("result", (e: GeoControlResults) => {
        console.log(e);
        updateCoords({
          lon: e.result.center[0],
          lat: e.result.center[1]
        })
      });

      return ctrl;
    },
    {position: "top-left"}
  );

  return null;
}

export default GeocoderControl;