"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { nominalFormat } from "@/lib/formater";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import WithdrawBalanceModal from "./WithdrawBalanceModal";
import { Skeleton } from "../ui/skeleton";

const BalanceCard = ({ showButton }: { showButton?: boolean }) => {
  const { data: session, status } = useSession();

  return (
    <Card className="h-fit max-w-[360px] flex-1 md:order-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Balance</CardTitle>
        <div className="font-bold">IDR</div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-2xl font-bold">
          {status === "loading" ? (
            <Skeleton className="h-8 w-3/4 rounded-full" />
          ) : (
            nominalFormat(session?.user?.balance)
          )}
        </div>
        {showButton && (
          <div className="flex flex-wrap gap-2">
            <WithdrawBalanceModal />
            <Link
              href="/balance/top-up"
              className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
            >
              Top Up
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
