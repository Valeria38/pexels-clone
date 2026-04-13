"use client";
import { Input } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface ISearchBarProps {
  query: string;
}

export default function SearchBar({ query }: ISearchBarProps) {
  const router = useRouter();
  const [input, setInput] = useState(query);

  const handleSubmit = () => {
    router.push("/?query=" + input);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" w-full max-w-md mx-auto py-10 ">
        <div className="relative mt-1 flex gap-4 items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
            <MagnifyingGlassIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <Input
            value={input}
            name="query"
            className="h-12 p-2.5 px-4 pl-10 rounded-lg bg-gray-50 border border-2 font-bold shadow-inner border-gray-200 text-gray-600 font-bold text-sm outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 w-full max-w-md shadow-sm placeholder:text-gray-400"
            placeholder="Search photos..."
            onChange={handleChange}
          />
          <Button type="submit" color="amber">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
