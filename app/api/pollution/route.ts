import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { AirPollutionData, ApiErrorType } from "@/types";

const API_KEY = process.env.OPEN_WEATHER_KEY!;

// Consultar la data de la calidad del aire
export async function GET(req: NextRequest) {
  try {
    const lat = req.nextUrl.searchParams.get("lat");
    const lon = req.nextUrl.searchParams.get("lon");

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const res = await axios.get<AirPollutionData>(url);

    return NextResponse.json(res.data);
    
  } catch (error: any) {
    console.log(`Error consultando air pollution: ${error.message}`);
    return NextResponse.json<{message: string, errorType: ApiErrorType}>(
      {message: "Something went wrong", errorType: "airPollution"},
      {status: 500}
    );
  }
}