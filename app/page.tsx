"use client"

import TemperatureChart from "@/components/TemperatureChart";
import { useGlobalContext } from "@/context/GlobalContext";

const Home = () => {
  const {forecast, isLoading, error} = useGlobalContext();

  return (
    <main className="py-4">
      <div className="container flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full">
          <TemperatureChart
            data={forecast}
            isLoading={isLoading}
            error={error}
            // data={null}
            // isLoading={false}
            // error={null}
          />
        </div>
        <div className="flex flex-col"></div>
      </div>
    </main>
  );
}

export default Home;