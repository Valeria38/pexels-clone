"use client";
import { ComboboxInput, Combobox, Input } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchPhotos } from "@/lib/pexels";
import Button from "./Button";

export default function SearchBar() {
  const handleSearch = async (formData: FormData) => {
    const query = formData.get("query") as string;
    const resp = await searchPhotos(query);
    console.log("response", resp);
  };

  return (
    <form action={handleSearch}>
      <div className=" w-full max-w-md mx-auto py-10 ">
        <div className="relative mt-1 flex gap-4 items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
            <MagnifyingGlassIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <Input
            name="query"
            className="w-full border-none rounded-2xl bg-white py-3 pl-10 pr-4 text-sm leading-5 text-gray-900 focus:ring-2 focus:ring-blue-500 shadow-lg outline-none transition-all"
            placeholder="Search photos..."
          />
          <Button color="amber">Search</Button>
        </div>
      </div>
    </form>
  );
}
