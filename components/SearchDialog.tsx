"use client"

import { Command as CommandIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Command, CommandInput } from "./ui/command";

const SearchDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex justify-between items-center gap-4 text-muted-foreground border"
          variant="outline"
          size="sm"
        >
          <p className="w-[120px] flex-shrink-0 text-sm text-left">
            Search here...
          </p>
          
          <div className="flex justify-center items-center">
            <CommandIcon className="w-4 h-4" />
            <p>+</p>
            <p className="">F</p>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 shadow-md">
        <Command className="">
          <CommandInput placeholder="Search places..." />
          <ul className="px-3 pb-2">
            <p className="p-2 text-sm text-muted-foreground">
              Suggested places
            </p>
          </ul>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

export default SearchDialog;