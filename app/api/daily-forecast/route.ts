import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { DailyForecast } from "@/types";

const API_KEY = process.env.OPEN_WEATHER_KEY!;

export async function GET(req: NextRequest) {
  try {
    const lat = -23.5505;
    const lon = -46.6333;
    
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const res = await axios.get<DailyForecast>(url);

    return NextResponse.json(res.data);
    
  } catch (error: any) {
    console.log(`Error consultando data diaria del clima: ${error.message}`);
    return NextResponse.json({message: "Something went wrong"}, {status: 500});
  }
}