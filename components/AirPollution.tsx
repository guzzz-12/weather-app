"use client"

import { HTMLAttributes } from "react";
import { Circle } from "lucide-react";
import ItemCard from "./ItemCard";
import { AirPollutionData, ApiErrorType } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  data: AirPollutionData | null;
  isLoading: boolean;
  error: string | null;
  errorType: ApiErrorType | null;
  className?: HTMLAttributes<HTMLElement>["className"];
}

const AirPollution = ({data, isLoading, error, errorType, className}: Props) => {
  let airQualityIndex = "good";
  let position = "left-1";
  let description = "";

  // Determinar el índice de la calidad del aire y la posición del slider
  switch (data?.list[0].main.aqi) {
    case 1:
      airQualityIndex = "good";
      description = "The air quality is satisfactory and poses little or no risk to health.";
      position = "left-1";
      break;
    case 2:
      airQualityIndex = "fair";
      description = "The air quality is acceptable; however, there may be some pollutants present that could pose a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
      position = "left-[25%]";
      break;
      case 3:
      airQualityIndex = "moderate";
      description = "The air quality is acceptable; however, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
      position = "left-[50%]";
      break;
    case 4:
      airQualityIndex = "poor";
      description = "The air quality is concerning for most individuals; sensitive groups may experience health effects, but the general public is less likely to be affected.";
      position = "left-[75%]";
      break;
    case 5:
      airQualityIndex = "very poor";
      description = "The air quality is potentially hazardous; everyone may experience health effects, and sensitive groups may experience more serious health effects.";
      position = "left-[90%]";
      break;
    default:
      airQualityIndex = "good";
      description = "The air quality is satisfactory and poses little or no risk to health.";
      position = "left-1";
  }

  return (
    <ItemCard
      className={className}
      title="Air Pollution"
      icon="SprayCan"
      error={error}
      errorType={errorType}
      loading={isLoading}
      loaderHeight="h-24"
      item="airPollution"
    >
      <div className="flex flex-col justify-start min-w-[1000px]:justify-center items-center w-full h-full">
        <div className="severity-gradient relative w-full h-4 mb-4 px-3 rounded-full">
          <Circle
            className={cn("absolute top-[50%] h-3.5 aspect-square text-neutral-700 dark:text-black fill-white -translate-y-[50%]", position)}
          />
        </div>

        <p className="w-full ml-3 mb-2 text-left text-sm font-bold">
          Air quality is {airQualityIndex}.
        </p>

        <p className="w-full ml-3 text-left text-xs leading-[1.6]">
          {description}
        </p>
      </div>
    </ItemCard>
  );
}

export default AirPollution;