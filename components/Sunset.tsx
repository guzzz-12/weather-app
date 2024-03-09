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
      loaderHeight="h-24"
      item="weatherData"
    >
      <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
        <div className="flex justify-start items-center gap-3 w-full">
          <SunriseIcon className="w-10 h-10 p-1 rounded-sm text-orange-700 bg-orange-100 border" />
          <p className="text-start text-neutral-700 font-semibold dark:text-white">
            Sunrise: <span className="font-normal">{sunriseTime}</span>
          </p>
        </div>
        <div className="flex justify-start items-center gap-3 w-full">
          <SunsetIcon className="w-10 h-10 p-1 rounded-sm text-orange-700 bg-orange-100 border" />
          <p className="text-start text-neutral-700 font-semibold dark:text-white">
            Sunset: <span className="font-normal">{sunsetTime}</span>
          </p>
        </div>
      </div>
    </ItemCard>
  );
}

export default Sunset;