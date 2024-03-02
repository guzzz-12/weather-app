"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { AirPollutionData, WeatherData } from "@/types";

axios.defaults.baseURL = process.env.BASE_URL as string;

interface GlobalState {
  forecast: WeatherData | null;
  airPollution: AirPollutionData | null;
  isLoading: boolean;
  error: string | null;
  setWeatherData: (data: WeatherData) => void;
  setAirPollutionData: (data: AirPollutionData) => void;
};

const GlobalContext = createContext<GlobalState>({
  forecast: null,
  airPollution: null,
  isLoading: true,
  error: null,
  setWeatherData: () => {},
  setAirPollutionData: () => {}
});

const GlobalContextProvider = ({children}: {children: ReactNode}) => {
  const [forecast, setForecast] = useState<WeatherData | null>(null);
  const [airPollution, setAirPollution] = useState<AirPollutionData | null>(null);
  const [loading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const setWeatherData = (data: WeatherData) => {
    setForecast(data);
  }

  const setAirPollutionData = (data: AirPollutionData) => {
    setAirPollution(data);
  }


  // Consultar la data del tiempo y actualizar el state
  // al inicializar la app o actualizar la página
  useEffect(() => {
    axios
    .get<WeatherData>("/api/weather")
    .then(res => {
      setForecast(res.data);
      return axios.get<AirPollutionData>("/api/pollution")
    })
    .then(res => {
      setAirPollution(res.data);
    })
    .catch((err: any) => {
      let message = err.message;

      if (err instanceof AxiosError) {
        err.response?.data.message;
      }

      setApiError(message);
    })
    .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airPollution,
        isLoading: loading,
        error: apiError,
        setWeatherData,
        setAirPollutionData
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;