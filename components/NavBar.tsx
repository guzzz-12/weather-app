"use client"

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav className="flex-shrink-0 bg-neutral-100 border dark:border-neutral-700 dark:bg-neutral-950">
      <div className="container flex justify-between items-center gap-2 py-2">
        <div className=" flex-grow">
          <Link className="py-2 text-2xl font-bold" href="/">
            WeatherMate
          </Link>
        </div>

        <div className="flex justify-center items-center gap-2 flex-shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default NavBar;