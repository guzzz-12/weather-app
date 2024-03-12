"use client"

import Mapbox from "mapbox-gl";
import { Map, Marker, NavigationControl } from "react-map-gl";
import { useTheme } from "next-themes";
import GeocoderControl from "./GeocoderControl";
import ItemCard from "./ItemCard";
import { useGlobalContext } from "@/context/GlobalContext";

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_KEY!
Mapbox.accessToken = MAPBOX_TOKEN;

interface Props {
  isLoading: boolean;
  error: string | null;
  errorType: any;
}

const MapContainer = ({isLoading, error, errorType}: Props) => {
  const {coords} = useGlobalContext();
  const {theme} = useTheme();

  const mapStyles = {
    light: "mapbox://styles/mapbox/light-v11",
    dark: "mapbox://styles/mapbox/dark-v11"
  }

  if (!coords) {
    return null;
  }

  return (
    <ItemCard
      title={null}
      icon={null}
      error={error}
      errorType={errorType}
      loading={isLoading}
      loaderHeight="h-full"
      item="weatherData"
    >
      <Map
        id="mainMap"
        style={{width: "100%", height: "100%", borderRadius: "8px"}}
        mapStyle={theme === "dark" ? mapStyles.dark : mapStyles.light}
        initialViewState={{
          latitude: coords.lat,
          longitude: coords.lon,
          zoom: 4
        }}
      >
        <Marker
          style={{transformOrigin: "bottom center"}}
          longitude={coords.lon}
          latitude={coords.lat}
        >
          <img
            className="block w-[30px] h-[30px] origin-bottom filter drop-shadow-sm"
            src="/location-pin.png"
            alt="Location marker"
          />
        </Marker>

        <NavigationControl position="bottom-right" />
        
        <GeocoderControl />
      </Map>
    </ItemCard>
  )
}

export default MapContainer;