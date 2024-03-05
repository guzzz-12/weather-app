import moment from "moment";
import ItemCard from "./ItemCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { ApiErrorType, DailyForecast } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  data: DailyForecast | null;
  isLoading: boolean;
  error: string | null;
  errorType: ApiErrorType | null;
}

const FiveDaysForecast = ({data, isLoading, error, errorType}: Props) => {
  return (
    <ItemCard
      title="5-Day Forecast"
      icon="CalendarDays"
      loading={isLoading}
      error={error}
      errorType={errorType}
      loaderHeight="h-24"
      item="dailyForecast"
    >
      <Carousel className="w-full max-w-xs py-2">
        <CarouselContent className="flex justify-center items-center">
          {data?.list.map((item, index) => {
            const isNightIcon = data && item.weather[0].icon.endsWith("n");

            return (
              <CarouselItem
                key={index}
                className="basis-1/2 h-full"
              >
                <div className="flex flex-col h-full">
                  <p className="mb-3 text-center text-sm">
                    {moment(item.dt_txt).format("DD/MM - HH:mm")}
                  </p>

                  <div className="flex flex-col justify-center items-center gap-1 mt-auto">
                    <img
                      className={cn("block w-full aspect-square object-cover object-center border rounded-sm bg-sky-600 dark:border-neutral-700")}
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    />
                    <p className="text-center text-sm">
                      {item.weather[0].main}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </ItemCard>
  )
}

export default FiveDaysForecast