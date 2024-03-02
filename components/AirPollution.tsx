"use client"

import { Circle } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { AirPollutionData } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  data: AirPollutionData | null;
  isLoading: boolean;
  error: string | null;
}

const AirPollution = ({data, isLoading, error}: Props) => {
  if (isLoading) {
    return (
      <Skeleton className="w-full h-4 rounded-sm border dark:border-neutral-700" />
    )
  }

  if (error) {
    return <p>{error}</p>
  }

  if (data) {
    let airQualityIndex = "good";
    let position = "left-1";

    // Determinar el índice de la calidad del aire y la posición del slider
    switch (data.list[0].main.aqi) {
      case 1:
        airQualityIndex = "good";
        position = "left-1";
        break;
      case 2:
        airQualityIndex = "fair";
        position = "left-[25%]";
        break;
        case 3:
        airQualityIndex = "moderate";
        position = "left-[50%]";
        break;
      case 4:
        airQualityIndex = "poor";
        position = "left-[75%]";
        break;
      case 5:
        airQualityIndex = "very poor";
        position = "left-[90%]";
        break;
      default:
        airQualityIndex = "good";
        position = "left-1";
    }

    return (
      <div className="flex flex-col justify-between items-center w-full h-max px-3 py-2 flex-shrink-0 border dark:border-neutral-700 rounded-lg bg-neutral-100 dark:bg-neutral-950">
        <div className="w-full mb-3 pb-2 border-b">
          <p className="text-sm text-neutral-700 font-semibold dark:text-white">
            Air Quality
          </p>
        </div>
  
        <div className="pollution-gradient relative w-full h-4 mb-3 px-3 rounded-full">
          <Circle
            className={cn("absolute top-[50%] h-3.5 aspect-square text-neutral-700 dark:text-black fill-white -translate-y-[50%]", position)}
          />
        </div>

        <p className="w-full ml-3 text-sm text-left">
          Air quality is {airQualityIndex}
        </p>
      </div>
    )
  }

  return null;
}

export default AirPollution;