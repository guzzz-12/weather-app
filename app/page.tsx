"use client"

import AirPollution from "@/components/AirPollution";
import Sunset from "@/components/Sunset";
import TemperatureChart from "@/components/TemperatureChart";
import { useGlobalContext } from "@/context/GlobalContext";

// import data from "@/dataExample.json";
// import { AirPollutionData, WeatherData } from "@/types";

const Home = () => {
  const {forecast, airPollution, isLoading, error} = useGlobalContext();

  return (
    <main className="py-4">
      <div className="container flex flex-col gap-4 md:flex-row">
        <section className="flex flex-col gap-4 flex-shrink-0">
          <TemperatureChart
            // data={data.weather as WeatherData}
            data={forecast}
            isLoading={isLoading}
            error={error}
          />
        </section>

        <section className="flex flex-col flex-grow">
          <div className="grid col-span-full gap-4 h-full sm:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution
              // data={data.airPollution as AirPollutionData}
              data={airPollution}
              isLoading={isLoading}
              error={error}
            />

            <Sunset
              // data={data.airPollution as AirPollutionData}
              data={forecast}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;