import { HTMLAttributes, useEffect, useState } from "react";
import { ApiErrorType, WeatherData } from "@/types";
import ItemCard from "./ItemCard";

interface Props {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  errorType: ApiErrorType | null;
  className?: HTMLAttributes<HTMLElement>["className"];
}

const Visibility = ({data, isLoading, error, errorType, className}: Props) => {
  const [descriptiveText, setDescriptiveText] = useState("N/A");

  // Generar el texto descriptivo para cada nivel de visibilidad
  useEffect(() => {
    if (data) {
      const visibility = data.visibility;

      setDescriptiveText(() => {
        if (visibility >= 10000) {
          return "Excellent visibility. Perfect for outdoor activities. Don't forget your sunglasses and sunscreen."
        }

        if (visibility > 5000 && visibility < 10000) {
          return "Moderate visibility with some haze in the air. Outdoor activities are still possible, but be cautious of reduced visibility when driving or engaging in sports."
        }

        if (visibility > 2000 && visibility <= 5000) {
          return "Limited visibility with fog or smoke present. Exercise caution when driving and consider rescheduling outdoor activities to a safer time."
        }

        if (visibility < 2000) {
          return "Severe visibility impairment due to dense fog, heavy rain, or snow. It's recommended to stay indoors and avoid any unnecessary travel until conditions improve."
        }

        return "N/A"
      });
    }

  }, [data]);

  return (
    <ItemCard
      className={className}
      title="Visibility"
      icon="Eye"
      loading={isLoading}
      error={error}
      errorType={errorType}
      loaderHeight="h-24"
      item="weatherData"
    >
      <div className="flex justify-center items-start min-[1000px]:items-center w-full h-full">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="flex-shrink-0 text-3xl text-center font-semibold">
            {data && Math.round(data.visibility/1000)} km
          </p>
          <p className="text-left text-xs leading-[1.6]">
            {descriptiveText}
          </p>
        </div>
      </div>
    </ItemCard>
  )
}

export default Visibility