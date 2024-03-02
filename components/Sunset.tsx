"use client"

import moment from "moment";
import { Sun, SunriseIcon, SunsetIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { WeatherData } from "@/types";

interface Props {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

const Sunset = ({data, isLoading, error}: Props) => {
  if (isLoading) {
    return (
      <Skeleton className="w-full h-24 rounded-sm border dark:border-neutral-700" />
    )
  }

  if (error) {
    return <p>{error}</p>
  }

  if (data){
    const sunsetTime = moment.unix(data.sys.sunset).utcOffset(data.timezone / 60).format("HH:mm");
    const sunriseTime = moment.unix(data.sys.sunrise).utcOffset(data.timezone / 60).format("HH:mm");
  
    return (
      <div className="flex flex-col justify-between items-center w-full h-max px-3 py-2 flex-shrink-0 border dark:border-neutral-700 rounded-lg bg-neutral-100 dark:bg-neutral-950">
        <div className="w-full mb-3 pb-2 border-b">
          <div className="flex justify-start items-center gap-2">
            <Sun className="text-neutral-500 dark:text-neutral-400" />
            <p className="text-sm text-neutral-700 font-semibold dark:text-white">
              Daylight
            </p>
          </div>
        </div>
  
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
      </div>
    );
  }

  return null;
}

export default Sunset;