"use client";
import React, { ChangeEvent, KeyboardEvent } from "react";
import { SearchIcon } from "lucide-react";
import { useParamsStore } from "@/hooks/useParams.store";
import { usePathname, useRouter } from "next/navigation";

const Search = () => {
  const setParams = useParamsStore((state) => state.setParams);
  const setValue = useParamsStore((state) => state.setSearchValue);
  const value = useParamsStore((state) => state.searchValue);
  const pathName = usePathname();
  const router = useRouter();
  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyDownHandle = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      serach();
    }
  };

  const serach = () => {
    if (pathName !== "/") router.push("/");
    setParams({ searchTerm: value });
  };

  return (
    <div className="flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm relative">
      <input
        value={value}
        onKeyDown={(e) => onKeyDownHandle(e)}
        onChange={(e) => onChangeHandle(e)}
        placeholder="Search Name"
        type="text"
        className="flex-grow pl-5 bg-transparent focus:outline-none border-transparent focus:border-transparent"
      />
      <button onClick={() => serach()}>
        <SearchIcon
          size={34}
          className="bg-green-500 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  );
};

export default Search;
