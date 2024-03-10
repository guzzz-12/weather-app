import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { ApiErrorType, WeatherData } from "@/types";

interface Props {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  errorType: ApiErrorType | null;
}

const Humidity = ({data, isLoading, error, errorType}: Props) => {
  const [descriptiveText, setDescriptiveText] = useState("N/A");

  // Generar el texto descriptivo para cada nivel de humedad relativa
  useEffect(() => {
    if (data) {
      const humidity = data.main.humidity;
      setDescriptiveText(() => {
        if (humidity < 25) {
          return "Low humidity. Make sure to stay hydrated and use a moisturizer to keep your skin hydrated."
        }

        if (humidity >=25 && humidity <30) {
          return "Moderate humidity. Enjoy the pleasant weather and consider drinking water regularly to stay hydrated."
        }

        if (humidity >=30 && humidity <60) {
          return "Optimal humidity. You can enjoy outdoor activities without feeling too sticky or sweaty."
        }

        if (humidity >=60 && humidity <70) {
          return "High humidity. Consider using a dehumidifier indoors to improve comfort."
        }

        if (humidity >70) {
          return "Higher humidity. Stay indoors in a cool, dry place and avoid strenuous outdoor activities to prevent dehydration."
        }

        return "N/A";
      });
    }
  }, [data]);

  return (
    <ItemCard
      title="Humidity"
      icon="Droplet"
      loading={isLoading}
      error={error}
      errorType={errorType}
      loaderHeight="h-24"
      item="weatherData"
    >
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="flex-shrink-0 text-3xl text-center font-semibold">
            {data?.main.humidity}%
          </p>
          <p className="text-left text-xs leading-[1.6]">
            {descriptiveText}
          </p>
        </div>
      </div>
    </ItemCard>
  )
}

export default Humidity