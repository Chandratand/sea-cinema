"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoogleIcon } from "@/lib/icon";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { nominalFormat } from "@/lib/formater";

const AuthButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="h-[20px] w-[150px] rounded-full" />;
  }

  if (status === "unauthenticated") {
    return (
      <Button variant="outline" onClick={() => signIn("google")}>
        <GoogleIcon className="mr-2 h-4 w-4" /> Continue With Google
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage src={session?.user?.image || ""} />
          </Avatar>
          {session?.user?.name} ({nominalFormat(session?.user?.balance)})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 ">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/balance">Top Up Balance</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;
