import { ReactNode } from "react";
import { AlertCircle, icons } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import { ApiErrorType } from "@/types";

interface Props {
  item: "weatherData" | "airPollution" | "dailyForecast";
  icon: keyof typeof icons;
  title: string;
  loading: boolean;
  error: string | null;
  errorType: ApiErrorType | null;
  loaderHeight: `h-${number}` | `h-[${number}px]` | `h-[${number}rem]`;
  children: ReactNode;
}

const ItemCard = ({icon, title, loading, error, errorType, loaderHeight, item, children}: Props) => {
  const Icon = icons[icon];

  if (loading) {
    return (
      <Skeleton className={cn("w-full rounded-sm border dark:border-neutral-700", loaderHeight)} />
    )
  }

  return (
    <div className="flex flex-col justify-start items-center w-full h-full px-3 py-2 flex-shrink-0 border dark:border-neutral-700 rounded-lg bg-neutral-100 dark:bg-neutral-950">
      <div className="w-full mb-3 pb-2 border-b">
        <div className="flex justify-start items-center gap-2">
          <Icon className="text-neutral-500 dark:text-neutral-400" />
          <p className="text-sm text-neutral-700 font-semibold dark:text-white">
            {title}
          </p>
        </div>
      </div>

      {error && errorType === item &&
        <div className="flex justify-start items-center gap-2 w-full text-sm">
          <AlertCircle className="text-red-600" />
          <p>{error}</p>
        </div>
      }

      {errorType !== item && children}
    </div>
  )
}

export default ItemCard;