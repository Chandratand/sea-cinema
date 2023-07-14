"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { nominalFormat } from "@/lib/formater";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const AuthButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="h-[20px] w-[150px] rounded-full" />;
  }

  if (status === "unauthenticated") {
    return (
      <Link
        className={cn(buttonVariants({ variant: "outline" }))}
        href="/sign-up"
      >
        Get Started
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {session?.user?.name} ({nominalFormat(session?.user?.balance)})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 ">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/balance">Balance</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/transactions">Transactions</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;
