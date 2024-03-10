import { useMap } from "react-map-gl";
import ItemCard from "./ItemCard";
import { Button } from "./ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { City, defaultLocations } from "@/utils/defaultLocations";
import { ApiErrorType, WeatherData } from "@/types";

interface Props {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  errorType: ApiErrorType | null;
}

const CityBtn = ({city}: {city: City}) => {
  const {mainMap} = useMap();
  const {updateCoords} = useGlobalContext();

  // Actualizar las coordenadas en el state y mover el mapa a la ubicación seleccionada
  const onClickHandler = (city: City) => {
    mainMap && mainMap.flyTo({center: {lat: city.lat, lon: city.lon}});
    updateCoords({lat: city.lat, lon: city.lon});
  }

  return (
    <Button
      className="border bg-white text-neutral-900 hover:text-white hover:bg-neutral-700 dark:text-white dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors"
      onClick={() => onClickHandler(city)}
    >
      {city.state}
    </Button>
  )
}

// Ordenar las ciudades en orden alfabético
const sortedLocations = () => {
  return defaultLocations.sort((a, b) => {
    const cityA = a.city;
    const cityB = b.city;

    if (cityA > cityB) return 1;
    if (cityA < cityB) return -1;

    return 0;
  })
}

const PopularLocations = ({isLoading, error, errorType}: Props) => {
  return (
    <ItemCard
      className="h-[350px] pb-4"
      title="Popular Locations"
      icon="Map"
      error={error}
      errorType={errorType}
      loading={isLoading}
      loaderHeight="h-24"
      item="weatherData"
    >
      <div className="flex flex-col gap-3 w-full pr-1 scrollbar-thin overflow-y-auto">
        {
          sortedLocations()
          .map(city => <CityBtn key={city.city} city={city} />)
        }
      </div>
    </ItemCard>
  )
}

export default PopularLocations;