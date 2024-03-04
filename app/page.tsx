"use client"

import AirPollution from "@/components/AirPollution";
import DailyForecast from "@/components/DailyForecast";
import Sunset from "@/components/Sunset";
import TemperatureChart from "@/components/TemperatureChart";
import Wind from "@/components/Wind";
import { useGlobalContext } from "@/context/GlobalContext";

// import data from "@/dataExample.json";
// import { AirPollutionData, WeatherData } from "@/types";

const Home = () => {
  const {forecast, airPollution, dailyForecast, isLoadingWeather, isLoadingDailyForecast, isLoadingAirPollution, error, apiErrorType} = useGlobalContext();

  return (
    <main className="py-4">
      <div className="container flex flex-col gap-4 md:flex-row">
        <section className="flex flex-col gap-4 flex-shrink-0">
          <TemperatureChart
            // data={data.weather as WeatherData}
            data={forecast}
            isLoading={isLoadingWeather}
            error={error}
            apiErrorType={apiErrorType}
          />
        </section>

        <section className="flex flex-col flex-grow">
          <div className="grid col-span-full gap-4 h-full sm:col-span-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution
              // data={data.airPollution as AirPollutionData}
              data={airPollution}
              isLoading={isLoadingAirPollution}
              error={error}
              errorType={apiErrorType}
            />

            <Sunset
              // data={data.airPollution as AirPollutionData}
              data={forecast}
              isLoading={isLoadingWeather}
              error={error}
              errorType={apiErrorType}
            />

            <Wind
              data={forecast}
              isLoading={isLoadingWeather}
              error={error}
              errorType={apiErrorType}
            />

            <DailyForecast
              data={dailyForecast}
              isLoading={isLoadingDailyForecast}
              error={error}
              errorType={apiErrorType}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;