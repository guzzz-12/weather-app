import ItemCard from "./ItemCard";
import { ApiErrorType, WeatherData } from "@/types";

interface Props {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  errorType: ApiErrorType | null;
}

const Wind = ({data, isLoading, error, errorType}: Props) => {
  const windSpeed = data?.wind.speed ?? 0;
  const windDirection = data?.wind.deg ?? 0;

  return (
    <ItemCard
      title="Wind"
      icon="Wind"
      error={error}
      errorType={errorType}
      loaderHeight="h-24"
      loading={isLoading}
      item="weatherData"
    >
      <div className="flex flex-col justify-center items-center gap-2 w-full h-full p-2">
        <div
          style={{
            backgroundImage: `url("/compass-rose.webp")`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
          className="relative w-full max-w-[200px] aspect-square rounded-full shadow-sm"
        >
          <img
            style={{transform: `translate(-50%, -50%) rotateZ(${windDirection}deg)`}}
            className="absolute block top-[50%] left-[50%] w-full h-full origin-center z-30"
            src="/compass-arrow.webp"
            alt="compass arrow"
          />
        </div>

        <p className="w-full text-sm text-center font-semibold">
          {windSpeed.toFixed(1)} m/s &nbsp; &mdash; &nbsp; @{windDirection}°
        </p>
      </div>
    </ItemCard>
  )
}

export default Wind;