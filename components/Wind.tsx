import ItemCard from "./ItemCard";
import { WeatherData } from "@/types";

interface Props {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

const Wind = ({data, isLoading, error}: Props) => {
  const windSpeed = data?.wind.speed ?? 0;
  const windDirection = data?.wind.deg ?? 0;

  return (
    <ItemCard
      title="Wind"
      icon="Wind"
      error={error}
      loaderHeight="h-[110px]"
      loading={isLoading}
    >
      <div
        style={{
          backgroundImage: `url("/compass-rose.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}
        className="relative w-[110px] h-[110px] mb-2 rounded-full shadow-sm"
      >
        <img
          style={{transform: `translate(-50%, -50%) rotateZ(${windDirection}deg)`}}
          className="absolute block top-[50%] left-[50%] w-full h-full origin-center z-30"
          src="/compass-arrow.webp"
          alt="compass arrow"
        />
      </div>

      <p className="w-full text-xs text-center font-semibold">
        {windSpeed.toFixed(1)} m/s &nbsp; &mdash; &nbsp; @{windDirection}°
      </p>
    </ItemCard>
  )
}

export default Wind;