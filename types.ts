export type ApiErrorType = "weatherData" | "airPollution" | "dailyForecast";

/** Respuesta del forecast de Weather API */
export interface WeatherData {
  coord: {
    lon: number;
    lat: number
  };

  weather: {
    id: number;
    main: string;
    description: string;
    icon: string
  }[];

  base: string;

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number
  };

  visibility: number;

  wind: {
    speed: number;
    deg: number;
    gust: number
  };

  rain: {
    "1h": number
  };

  clouds: {
    all: number
  };

  dt: number;
  
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number
  };

  timezone: number;
  id: number;
  name: string;
  cod: number
}


/** Respuesta del air pollution API */
export interface AirPollutionData {
  coord: [number, number];
  list: {
    dt: number;
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  }[];
}


/** Respuesta del daily forecast */
export interface DailyForecast {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}