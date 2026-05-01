"use client";
import { Input } from "@headlessui/react";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import Button from "./Button";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface ISearchBarProps {
  initialQuery: string;
}

export default function SearchBar({ initialQuery }: ISearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [input, setInput] = useState(initialQuery);
  const [prevQuery, setPrevQuery] = useState(query);

  if (query !== prevQuery) {
    setPrevQuery(query);
    if (query) setInput(query);
  }

  const handleSubmit = () => {
    router.push("/?query=" + input);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" w-full max-w-md mx-auto py-10 ">
        <div className="flex gap-4 flex-col md:flex-row w-full">
          <div className="relative grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
              <MagnifyingGlassIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <Input
              value={input}
              name="query"
              className="p-2 pl-10 md:p-3 md:pl-10 md:text-base rounded-xl bg-gray-50 border border-2 font-bold shadow-inner border-gray-200 text-gray-600 font-bold text-sm outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 w-full shadow-sm placeholder:text-gray-400"
              placeholder="Search photos..."
              onChange={handleChange}
            />
          </div>

          <Button type="submit" color="amber">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
