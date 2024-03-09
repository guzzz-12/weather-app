"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { AirPollutionData, DailyForecast, ApiErrorType, WeatherData } from "@/types";

axios.defaults.baseURL = process.env.BASE_URL as string;

export type Coords = {lat: number, lon: number};

interface GlobalState {
  coords: Coords | null,
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
  updateCoords: (coords: Coords) => void;
};

const GlobalContext = createContext<GlobalState>({
  coords: null,
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
  setDailyForecastData: () => {},
  updateCoords: () => {}
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
  const [coords, setCoords] = useState<Coords | null>(null);

  const [forecast, setForecast] = useState<WeatherData | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast | null>(null);
  const [airPollution, setAirPollution] = useState<AirPollutionData | null>(null);
  
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [isLoadingAirPollution, setIsLoadingAirPollution] = useState(true);
  const [isLoadingDailyForecast, setIsLoadingDailyForecast] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiErrorType, setApiErrorType] = useState<ApiErrorType | null>(null);

  /** Actualizar la data del pronóstico principal */
  const setWeatherData = (data: WeatherData) => {
    setForecast(data);
  }

  /** Actualizar la data de la calidad del aire */
  const setAirPollutionData = (data: AirPollutionData) => {
    setAirPollution(data);
  }

  /** Actualizar la data del pronóstico de 5 días */
  const setDailyForecastData = (data: DailyForecast) =>{
    setDailyForecast(data);
  }

  /** Actualizar las coordenadas */
  const updateCoords = (coords: Coords) => {
    setCoords(coords);
  }

  // Inicializar las coordenadas con la ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator
      .geolocation
      .getCurrentPosition(
        (location) => {
          const {coords: {latitude, longitude}} = location;
          setCoords({lat: latitude, lon: longitude});
        },
        (err) => {
          setCoords({lat: 0, lon: 0});

          if (err.PERMISSION_DENIED) {
            toast.error("User location blocked by the user")
          } else {
            toast.error(err.message);
          }
        }
      );
    } else {
      setCoords({lat: 0, lon: 0})
    }
  }, []);


  // Consultar la data del tiempo y actualizar el state
  // al inicializar la app o actualizar la página
  useEffect(() => {
    if (coords) {
      // Data del weather
      axios
      .get<WeatherData>(`/api/weather?lat=${coords.lat}&lon=${coords.lon}`)
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
      .get<AirPollutionData>(`/api/pollution?lat=${coords.lat}&lon=${coords.lon}`)
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
      .get<DailyForecast>(`/api/daily-forecast?lat=${coords.lat}&lon=${coords.lon}`)
      .then(res => {
        setDailyForecast(res.data);
      })
      .catch((err: any) => {
        const message = apiErrorHandler(err);
        setApiErrorType("dailyForecast");
        setApiError(message);
      })
      .finally(() => setIsLoadingDailyForecast(false));      
    }
  }, [coords]);
  

  return (
    <GlobalContext.Provider
      value={{
        coords,
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
        setDailyForecastData,
        updateCoords
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;