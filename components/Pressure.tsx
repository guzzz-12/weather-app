import { useEffect, useState } from "react";
import { ApiErrorType, WeatherData } from "@/types";
import ItemCard from "./ItemCard";

interface Props {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  errorType: ApiErrorType | null;
}

const Pressure = ({data, isLoading, error, errorType}: Props) => {
  const [descriptiveText, setDescriptiveText] = useState("N/A");

  useEffect(() => {
    if (data) {
      const pressure = data.main.pressure;

      setDescriptiveText(() => {
        if (pressure < 1000) {
          return "Low pressure. It is recommended to carry an umbrella or raincoat and be prepared for changing weather conditions."
        }

        if (pressure >= 1000 && pressure <= 1015) {
          return "Moderate pressure. Moderate pressure typically signifies fair weather with comfortable temperatures. It is a great time to enjoy outdoor activities such as hiking or picnicking."
        }

        if (pressure > 1015 && pressure <= 1030) {
          return "Normal pressure. It is the perfect weather for spending time outdoors, whether it's going for a walk, having a picnic, or enjoying a day at the beach."
        }

        if (pressure > 1030 && pressure <= 1045) {
          return "High pressure. High pressure usually brings dry and clear weather with plenty of sunshine. You may experience warm temperatures and light winds. It is ideal for outdoor activities or simply relaxing in the sun."
        }

        if (pressure > 1045) {
          return "Very high pressure. Expect sunny and hot conditions with clear skies and minimal cloud cover, so it is essential to stay hydrated, wear sunscreen, and seek shade."
        }

        return "N/A";
      });

    }
  }, [data]);

  return (
    <ItemCard
      title="Pressure"
      icon="GaugeCircle"
      loading={isLoading}
      error={error}
      errorType={errorType}
      loaderHeight="h-24"
      item="weatherData"
    >
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col justify-center items-center gap-3">
          {data &&
            <div className="flex flex-col gap-1 flex-shrink-0">
              <p className="text-3xl text-center font-semibold">
                {data.main.pressure} mbar
              </p>
              <div className="flex justify-start items-center gap-1 text-sm">
                <p>
                  {Math.round(data.main.pressure * 760/1013.25)} mmHg
                </p>
                <p>|</p>
                <p>
                  {Math.round(data.main.pressure)} hPa
                </p>
              </div>
            </div>
          }
          <p className="text-left text-xs leading-[1.6]">
            {descriptiveText}
          </p>
        </div>
      </div>
    </ItemCard>
  )
}

export default Pressure