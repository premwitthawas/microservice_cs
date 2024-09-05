"use client";
import React from "react";
import { CarFront } from "lucide-react";
const Navbar = () => {
  return (
    <header className="px-1.5 md:px-4 lg:px-8 xl:px-16 w-full sticky top-0 z-50 flex justify-between backdrop-blur-lg shadow-xl h-[50px] items-center">
      <div>
        <div className="font-medium text-sm md:text-base tracking-tighter flex text-green-500 items-center">
          Auction <CarFront className="w-5 h-5 ml-0.5 md:ml-2" />
        </div>
      </div>
      <div>Search</div>
      <div>Login</div>
    </header>
  );
};

export default Navbar;
