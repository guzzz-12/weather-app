"use client"

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SearchDialog from "./SearchDialog";

const NavBar = () => {
  return (
    <nav className="bg-neutral-100 border dark:border-neutral-700 dark:bg-neutral-950">
      <div className="container flex justify-between items-center gap-2 py-2">
        <div className=" flex-grow">
          <Link className="py-2 text-2xl font-bold" href="/">
            LOGO
          </Link>
        </div>

        <div className="flex justify-center items-center gap-2 flex-shrink-0">
          <SearchDialog />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default NavBar;