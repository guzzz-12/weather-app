"use client"

import { Circle } from "lucide-react";
import ItemCard from "./ItemCard";
import { AirPollutionData, ApiErrorType } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  data: AirPollutionData | null;
  isLoading: boolean;
  error: string | null;
  errorType: ApiErrorType | null;
}

const AirPollution = ({data, isLoading, error, errorType}: Props) => {
  let airQualityIndex = "good";
  let position = "left-1";

  // Determinar el índice de la calidad del aire y la posición del slider
  switch (data?.list[0].main.aqi) {
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
    <ItemCard
      title="Air Pollution"
      icon="SprayCan"
      error={error}
      errorType={errorType}
      loading={isLoading}
      loaderHeight="h-full"
      item="airPollution"
    >
      <div className="flex flex-col justify-center items-center w-full h-full mb-3">
        <div className="severity-gradient relative w-full h-4 mb-3 px-3 rounded-full">
          <Circle
            className={cn("absolute top-[50%] h-3.5 aspect-square text-neutral-700 dark:text-black fill-white -translate-y-[50%]", position)}
          />
        </div>

        <p className="w-full ml-3 text-left">
          Air quality is <span className="font-bold">{airQualityIndex}</span>.
        </p>
      </div>
    </ItemCard>
  );
}

export default AirPollution;