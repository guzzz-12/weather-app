"use client"

import { HTMLAttributes } from "react";
import moment from "moment";
import { AlertCircle, MapPin } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { ApiErrorType, WeatherData } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  apiErrorType: ApiErrorType | null;
  className?: HTMLAttributes<HTMLElement>["className"];
}

const TemperatureChart = ({data, isLoading, error, apiErrorType, className}: Props) => {
  if (isLoading) {
    return (
      <Skeleton className="w-[250px] aspect-square border dark:border-neutral-700 rounded-lg" />
    )
  }

  const isNightIcon = data && data.weather[0].icon.endsWith("n");

  return (
    <div className={cn("flex flex-col justify-between items-center gap-4 py-2 border dark:border-neutral-700 rounded-lg bg-neutral-100 dark:bg-neutral-950 overflow-hidden", className)}>
      {error && apiErrorType === "weatherData" &&
        <div className="flex justify-start items-center gap-2 w-full px-4 text-sm">
          <AlertCircle className="text-red-600" />
          <p>{error}</p>
        </div>
      }

      {data &&
        <>
          <div className="w-full">
            <div className="flex justify-between items-center w-full mb-2 px-3 pb-2 border-b">
              <p className="text-sm text-neutral-700 dark:text-white">
                {moment().format("dddd")}
              </p>
              <p className="text-xs text-neutral-700 dark:text-white">
                Local Time: {moment.utc().add(data.timezone, "second").format("HH:mm")}
              </p>
            </div>
    
            <div className="flex justify-start items-center gap-1 w-full px-3">
              <MapPin className="w-4 h-4 opacity-65" />
              <p className="text-lg text-neutral-700 dark:text-white">
                {data.name}
              </p>
            </div>
          </div>
    
          <div className="flex flex-col gap-1">
            <div className="flex justify-start items-center gap-2 w-full text-xs text-left dark:opacity-65">
              <p>
                Min: {Math.round(data.main.temp_min)}°C
              </p>

              <span>|</span>

              <p>
                Max: {Math.round(data.main.temp_max)}°C
              </p>
            </div>

            <p className="text-6xl text-center font-bold">
              {Math.round(data.main.temp)}°C
            </p>

            <p className="text-xs text-left dark:opacity-65">
              Feels like {Math.round(data.main.feels_like)}°C
            </p>
          </div>
    
          <div className="w-full pl-4">
            <div className="flex justify-start items-center gap-2 mb-2">
              <img
                className={cn("block w-12 h-9 object-cover object-center border rounded-sm bg-sky-500 dark:border-neutral-700", isNightIcon && "bg-sky-400")}
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              />
              <p className="text-sm">
                {data.weather[0].main}
              </p>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default TemperatureChart;