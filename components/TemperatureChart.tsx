"use client"

import moment from "moment";
import { MapPin } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { WeatherData } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

const TemperatureChart = ({data, isLoading, error}: Props) => {
  if (isLoading) {
    return (
      <Skeleton className="w-[250px] aspect-square border dark:border-neutral-700 rounded-lg" />
    )
  }

  if (error) {
    return <p>{error}</p>
  }

  
  if (data) {
    const isNightIcon = data.weather[0].icon.endsWith("n");

    return (
      <div className="flex flex-col justify-between items-center w-[250px] aspect-square py-2 flex-shrink-0 border dark:border-neutral-700 rounded-lg bg-neutral-100 dark:bg-neutral-950">
        <div className="w-full">
          <div className="flex justify-between items-center w-full mb-2 px-3 pb-2 border-b">
            <p className="text-sm text-neutral-700 dark:text-white">
              {moment().format("dddd")}
            </p>
            <p className="text-xs text-neutral-700 dark:text-white">
              Local Time: {moment().utcOffset(data.timezone / 60).format("HH:mm")}
            </p>
          </div>
  
          <div className="flex justify-start items-center gap-1 w-full px-3">
            <MapPin className="w-4 h-4 opacity-65" />
            <p className="font-semibold text-neutral-700 dark:text-white">
              {data.name}
            </p>
          </div>
        </div>
  
        <div className="flex flex-col gap-1">
          <p className="text-6xl text-center font-bold">
            {Math.round(data.main.temp)}°C
          </p>

          <div className="flex justify-center items-center gap-2 w-full text-xs">
            <p>
              Min: {Math.round(data.main.temp_min)}°C
            </p>

            <span>|</span>

            <p>
              Max: {Math.round(data.main.temp_max)}°C
            </p>
          </div>
        </div>
  
        <div className="w-full ml-4">
          <div className="flex justify-start items-center gap-2 mb-2">
            <img
              className={cn("block w-12 h-9 object-cover object-center border rounded-sm bg-neutral-400 dark:border-neutral-700 dark:bg-transparent", isNightIcon && "bg-transparent dark:bg-neutral-300")}
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            />
            <p className="">
              {data.weather[0].main}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null;
}

export default TemperatureChart;