"use client"

import AirPollution from "@/components/AirPollution";
import FiveDaysForecast from "@/components/FiveDaysForecast";
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full">
            <div className="col-span-2 h-full">
              <AirPollution
                // data={data.airPollution as AirPollutionData}
                data={airPollution}
                isLoading={isLoadingAirPollution}
                error={error}
                errorType={apiErrorType}
              />
            </div>

            <div className="col-span-1 h-full">
              <Sunset
                // data={data.airPollution as AirPollutionData}
                data={forecast}
                isLoading={isLoadingWeather}
                error={error}
                errorType={apiErrorType}
              />
            </div>

            <div className="col-span-1 h-full">
              <Wind
                data={forecast}
                isLoading={isLoadingWeather}
                error={error}
                errorType={apiErrorType}
              />
            </div>

            <div className="col-span-2 h-full">
              <FiveDaysForecast
                data={dailyForecast}
                isLoading={isLoadingDailyForecast}
                error={error}
                errorType={apiErrorType}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;