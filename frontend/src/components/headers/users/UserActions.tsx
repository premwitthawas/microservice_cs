"use client";
import { Button } from "@/components/ui/button";
import { User } from "next-auth";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CarFrontIcon, LogOut, Settings, Trophy, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";
import { useParamsStore } from "@/hooks/useParams.store";

interface Props {
  user: User;
}

const UserActions = ({ user }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const setParams = useParamsStore((state) => state.setParams);

  const setWinner = () => {
    setParams({ winner: user.username, seller: undefined });
    if (pathName !== "/") router.push("/");
  };

  const setSeller = () => {
    setParams({ seller: user.username, winner: undefined });
    if (pathName !== "/") router.push("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          Welcome {user.name} <UserIcon className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSeller()}
        >
          <UserIcon className="w-4 h-4 mr-2" />
          My Auctions
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setWinner()}
        >
          <Trophy className="w-4 h-4 mr-2" />
          Auction Won
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/auctions/create")}
        >
          <CarFrontIcon className="w-4 h-4 mr-2" />
          Sell Cars
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/session")}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <Separator className="my-2" />
        <DropdownMenuItem
          className="cursor-pointer text-white bg-red-500"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4 mr-2" />
          logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;
