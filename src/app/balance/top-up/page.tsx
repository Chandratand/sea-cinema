"use client";

import { useState } from "react";
import BalanceCard from "@/components/Balance/BalanceCard";
import TopUpBalanceModal from "@/components/Balance/TopUpBalanceModal";
import TopUpMethodButton from "@/components/TopUpMethodButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopUpBalanceMethod } from "@/lib/data-types";
import { topUpMethods } from "@/lib/dummy-data";

const TopUpBalance = () => {
  const [openTopUpModal, setOpenTopUpModal] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] =
    useState<TopUpBalanceMethod | null>(null);

  const handleSelectMethod = (method: TopUpBalanceMethod) => {
    setSelectedMethod(method);
    setOpenTopUpModal(true);
  };

  return (
    <section className="container py-6">
      <h1 className="text-lg font-bold">Top Up Balance</h1>
      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        <BalanceCard />

        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Choose Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {topUpMethods.map((method, index) => (
              <TopUpMethodButton
                key={index}
                {...method}
                onClick={() => handleSelectMethod(method)}
              />
            ))}
          </CardContent>
        </Card>
        <TopUpBalanceModal
          open={openTopUpModal}
          onOpenChange={setOpenTopUpModal}
          data={selectedMethod}
        />
      </div>
    </section>
  );
};

export default TopUpBalance;
