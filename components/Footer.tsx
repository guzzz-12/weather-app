import { Copyright } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-neutral-100 border-t dark:border-neutral-700 dark:bg-neutral-950">
      <div className="container flex items-center gap-4 px-4 py-1">
        <div className="flex justify-center items-center gap-1 ml-auto text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex justify-center items-center">
            <Copyright className="w-4 h-4 mr-[2px]" />
            <span>
              {new Date().getFullYear()}
            </span>
          </div>

          <span>&mdash;</span>

          <p className="">
            Developed by Jesús Guzmán
          </p>
        </div>

        <div className="flex justify-center items-center gap-1 ml-auto">
          <a
            className="flex justify-center items-center p-2 border rounded-full bg-white dark:bg-transparent"
            href="https://github.com/guzzz-12"
            target="_blank" rel="noopener noreferrer"
          >
            <img
              className="w-[20px] h-[20px] opacity-80 filter dark:invert"
              src="/github-icon.svg"
              alt="Github icon"
            />
          </a>

          <a
            className="flex justify-center items-center p-2 border rounded-full bg-white dark:bg-transparent"
            href="https://www.behance.net/guzzz_12"
            target="_blank" rel="noopener noreferrer"
          >
            <img
              className="w-[20px] h-[20px] opacity-80 filter dark:invert"
              src="/behance-icon.svg"
              alt="Behance icon"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer