"use client"

import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { MapProvider } from "react-map-gl";
import AirPollution from "@/components/AirPollution";
import FiveDaysForecast from "@/components/FiveDaysForecast";
import Humidity from "@/components/Humidity";
import Pressure from "@/components/Pressure";
import Sunset from "@/components/Sunset";
import TemperatureChart from "@/components/TemperatureChart";
import Visibility from "@/components/Visibility";
import Wind from "@/components/Wind";
import PopularLocations from "@/components/PopularLocationss";
import { useGlobalContext } from "@/context/GlobalContext";

// import data from "@/dataExample.json";
// import { AirPollutionData, WeatherData } from "@/types";

const MapContainer = dynamic(() => import("../components/MapContainer"), {ssr: false});

const Home = () => {
  const {forecast, airPollution, dailyForecast, isLoadingWeather, isLoadingDailyForecast, isLoadingAirPollution, error, apiErrorType} = useGlobalContext();

  return (
    <main className="pt-4 pb-9">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000
        }}
      />

      <MapProvider>
        <div className="container flex gap-4 w-full">
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

          <div className="w-full overflow-hidden">
            <section className="w-full mb-4">
              <FiveDaysForecast
                data={dailyForecast}
                isLoading={isLoadingDailyForecast}
                error={error}
                errorType={apiErrorType}
              />
            </section>

            <section className="flex justify-between items-stretch gap-4 mb-4">
              <div className="w-full aspect-video">
                <MapContainer
                  isLoading={isLoadingWeather}
                  error={error}
                  errorType={apiErrorType}
                />
              </div>

              <div className="flex flex-col gap-4 w-[360px] h-full">
                <div className="w-full">
                  <Sunset
                    // data={data.airPollution as AirPollutionData}
                    data={forecast}
                    isLoading={isLoadingWeather}
                    error={error}
                    errorType={apiErrorType}
                  />
                </div>
                <div className="w-full">
                  <Wind
                    data={forecast}
                    isLoading={isLoadingWeather}
                    error={error}
                    errorType={apiErrorType}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 w-[360px]">
                <PopularLocations
                  data={forecast}
                  isLoading={isLoadingWeather}
                  error={error}
                  errorType={apiErrorType}
                />
              </div>
            </section>
          </div>
        </div>
      </MapProvider>
    </main>
  );
}

export default Home;