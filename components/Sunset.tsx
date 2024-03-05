"use client"

import moment from "moment";
import { SunriseIcon, SunsetIcon } from "lucide-react";
import ItemCard from "./ItemCard";
import { ApiErrorType, WeatherData } from "@/types";

interface Props {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  errorType: ApiErrorType | null;
}

const Sunset = ({data, isLoading, error, errorType}: Props) => {
  const sunsetTime = data && moment.unix(data.sys.sunset).utcOffset(data.timezone / 60).format("HH:mm");
  const sunriseTime = data && moment.unix(data.sys.sunrise).utcOffset(data.timezone / 60).format("HH:mm");

  return (
    <ItemCard
      title="Daylight"
      icon="Sun"
      error={error}
      errorType={errorType}
      loading={isLoading}
      loaderHeight="h-full"
      item="weatherData"
    >
      <div className="flex flex-col items-start gap-1 w-full">
        <div className="flex justify-start items-baseline gap-2">
          <SunriseIcon className="w-4 h-4" />
          <p className="text-sm text-start text-neutral-700 font-semibold dark:text-white">
            Sunrise: <span className="font-normal">{sunriseTime}</span>
          </p>
        </div>
        <div className="flex justify-start items-baseline gap-2">
          <SunsetIcon className="w-4 h-4" />
          <p className="text-sm text-start text-neutral-700 font-semibold dark:text-white">
            Sunset: <span className="font-normal">{sunsetTime}</span>
          </p>
        </div>
      </div>
    </ItemCard>
  );
}

export default Sunset;