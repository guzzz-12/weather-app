"use client"

import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import AirPollution from "@/components/AirPollution";
import FiveDaysForecast from "@/components/FiveDaysForecast";
import Humidity from "@/components/Humidity";
import Pressure from "@/components/Pressure";
import Sunset from "@/components/Sunset";
import TemperatureChart from "@/components/TemperatureChart";
import Visibility from "@/components/Visibility";
import Wind from "@/components/Wind";
import { useGlobalContext } from "@/context/GlobalContext";

// import data from "@/dataExample.json";
// import { AirPollutionData, WeatherData } from "@/types";

const MapContainer = dynamic(() => import("../components/MapContainer"), {ssr: false});

const Home = () => {
  const {forecast, airPollution, dailyForecast, isLoadingWeather, isLoadingDailyForecast, isLoadingAirPollution, error, apiErrorType} = useGlobalContext();

  return (
    <main className="py-4">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000
        }}
      />

      <div className="container flex flex-col gap-4 md:flex-row">
        <section className="flex flex-col gap-4 w-[270px] flex-shrink-0">
          <TemperatureChart
            // data={data.weather as WeatherData}
            data={forecast}
            isLoading={isLoadingWeather}
            error={error}
            apiErrorType={apiErrorType}
          />

          <div className="w-full h-full">
            <AirPollution
              // data={data.airPollution as AirPollutionData}
              data={airPollution}
              isLoading={isLoadingAirPollution}
              error={error}
              errorType={apiErrorType}
            />
          </div>

          <div className="w-full h-full">
            <Humidity
              data={forecast}
              isLoading={isLoadingWeather}
              error={error}
              errorType={apiErrorType}
            />
          </div>

          <div className="w-full h-full">
            <Pressure
              data={forecast}
              isLoading={isLoadingWeather}
              error={error}
              errorType={apiErrorType}
            />
          </div>

          <div className="w-full h-full">
            <Visibility
              data={forecast}
              isLoading={isLoadingWeather}
              error={error}
              errorType={apiErrorType}
            />
          </div>
        </section>

        <section className="flex flex-col flex-grow">
          <div className="grid content-start grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full">
            <div className="col-span-2 w-full h-full flex-shrink-0">
              <MapContainer
                isLoading={isLoadingWeather}
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

            <div className="col-span-4 h-max">
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