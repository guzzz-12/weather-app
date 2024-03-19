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
    <main className="h-full flex-grow py-4 overflow-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000
        }}
      />

      <MapProvider>
        <div className="container flex flex-col gap-4 w-full h-full min-[1000px]:flex-row">
          {/* Columna izquierda */}
          <section className="flex flex-row gap-4 w-full h-[max] pr-1 flex-shrink-0 overflow-x-auto scrollbar-thin min-[1000px]:flex-col min-[1000px]:w-[270px] min-[1000px]:h-full min-[1000px]:overflow-y-auto">
            <div className="w-[250px] flex-shrink-0 min-[1000px]:w-full">
              <TemperatureChart
                className=""
                data={forecast}
                isLoading={isLoadingWeather}
                error={error}
                apiErrorType={apiErrorType}
              />
            </div>

            <div className="w-[250px] flex-shrink-0 min-[1000px]:w-full">
              <AirPollution
                data={airPollution}
                isLoading={isLoadingAirPollution}
                error={error}
                errorType={apiErrorType}
              />
            </div>

            <div className="w-[250px] flex-shrink-0 min-[1000px]:w-full">
              <Humidity
                data={forecast}
                isLoading={isLoadingWeather}
                error={error}
                errorType={apiErrorType}
              />
            </div>

            <div className="w-[250px] flex-shrink-0 min-[1000px]:w-full">
              <Pressure
                data={forecast}
                isLoading={isLoadingWeather}
                error={error}
                errorType={apiErrorType}
              />
            </div>

            <div className="w-[250px] flex-shrink-0 min-[1000px]:w-full">
              <Visibility
                data={forecast}
                isLoading={isLoadingWeather}
                error={error}
                errorType={apiErrorType}
              />
            </div>
          </section>

          {/* Columna derecha */}
          <div className="flex flex-col justify-beetween gap-3 w-full flex-grow overflow-hidden">
            <section className="w-full flex-shrink-0">
              <FiveDaysForecast
                data={dailyForecast}
                isLoading={isLoadingDailyForecast}
                error={error}
                errorType={apiErrorType}
              />
            </section>

            <section className="flex justify-between items-stretch gap-3 flex-grow">
              <div className="w-full">
                <MapContainer
                  isLoading={isLoadingWeather}
                  error={error}
                  errorType={apiErrorType}
                />
              </div>

              <div className="flex flex-col justify-stretch gap-3 w-[360px]">
                <div className="w-full">
                  <Sunset
                    // data={data.airPollution as AirPollutionData}
                    data={forecast}
                    isLoading={isLoadingWeather}
                    error={error}
                    errorType={apiErrorType}
                  />
                </div>
                <div className="w-full basis-full">
                  <Wind
                    data={forecast}
                    isLoading={isLoadingWeather}
                    error={error}
                    errorType={apiErrorType}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 w-[360px] flex-grow">
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