"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { AirPollutionData, DailyForecast, ApiErrorType, WeatherData } from "@/types";

axios.defaults.baseURL = process.env.BASE_URL as string;

interface GlobalState {
  forecast: WeatherData | null;
  airPollution: AirPollutionData | null;
  dailyForecast: DailyForecast | null;
  isLoadingWeather: boolean;
  isLoadingAirPollution: boolean;
  isLoadingDailyForecast: boolean;
  error: string | null;
  apiErrorType: ApiErrorType | null;
  setWeatherData: (data: WeatherData) => void;
  setAirPollutionData: (data: AirPollutionData) => void;
  setDailyForecastData: (data: DailyForecast) => void;
};

const GlobalContext = createContext<GlobalState>({
  forecast: null,
  airPollution: null,
  dailyForecast: null,
  isLoadingWeather: true,
  isLoadingAirPollution: true,
  isLoadingDailyForecast: true,
  error: null,
  apiErrorType: null,
  setWeatherData: () => {},
  setAirPollutionData: () => {},
  setDailyForecastData: () => {}
});


/** Generar mensaje de error de api */
const apiErrorHandler = (error: any) => {
  let message: string = error.message;

  if (error instanceof AxiosError) {
    message = error.response?.data.message;
  }

  return message;
}


const GlobalContextProvider = ({children}: {children: ReactNode}) => {
  const [forecast, setForecast] = useState<WeatherData | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast | null>(null);
  const [airPollution, setAirPollution] = useState<AirPollutionData | null>(null);
  
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [isLoadingAirPollution, setIsLoadingAirPollution] = useState(true);
  const [isLoadingDailyForecast, setIsLoadingDailyForecast] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiErrorType, setApiErrorType] = useState<ApiErrorType | null>(null);

  const setWeatherData = (data: WeatherData) => {
    setForecast(data);
  }

  const setAirPollutionData = (data: AirPollutionData) => {
    setAirPollution(data);
  }

  const setDailyForecastData = (data: DailyForecast) =>{
    setDailyForecast(data);
  }


  // Consultar la data del tiempo y actualizar el state
  // al inicializar la app o actualizar la página
  useEffect(() => {
    // Data del weather
    axios
    .get<WeatherData>("/api/weather")
    .then(res => {
      setForecast(res.data);
    })
    .catch((err: any) => {
      const message = apiErrorHandler(err);
      setApiErrorType("weatherData");
      setApiError(message);
    })
    .finally(() => setIsLoadingWeather(false));


    // Data del air pollution
    axios
    .get<AirPollutionData>("/api/pollution")
    .then(res => {
      setAirPollution(res.data);
    })
    .catch((err: any) => {
      const message = apiErrorHandler(err);
      setApiErrorType("airPollution");
      setApiError(message);
    })
    .finally(() => setIsLoadingAirPollution(false));


    // Data del daily forecast
    axios
    .get<DailyForecast>("/api/daily-forecast")
    .then(res => {
      setDailyForecast(res.data);
    })
    .catch((err: any) => {
      const message = apiErrorHandler(err);
      setApiErrorType("dailyForecast");
      setApiError(message);
    })
    .finally(() => setIsLoadingDailyForecast(false));
  }, []);
  

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airPollution,
        dailyForecast,
        isLoadingWeather: isLoadingWeather,
        isLoadingAirPollution: isLoadingAirPollution,
        isLoadingDailyForecast: isLoadingDailyForecast,
        error: apiError,
        apiErrorType,
        setWeatherData,
        setAirPollutionData,
        setDailyForecastData
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;