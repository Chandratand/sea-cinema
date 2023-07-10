"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import TransactionCard from "@/components/Transaction/TransactionCard";
import { Transactions } from "@/lib/data-types";
import { Skeleton } from "@/components/ui/skeleton";

const Transaction = () => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTransactions = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/transaction");
      setTransactions(res.data.data);
    } catch (error) {
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const removeTicketFromState = (id: number) => {
    const newTransactionList = transactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(newTransactionList);
  };

  if (isLoading) {
    return (
      <section className="container space-y-4 py-6">
        <Skeleton className="h-60 w-full" />
        <Skeleton className="h-60 w-full" />
        <Skeleton className="h-60 w-full" />
      </section>
    );
  }

  return (
    <section className="container py-6">
      {transactions.length > 0 ? (
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onCancel={removeTicketFromState}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-[80vh] flex-col items-center justify-center gap-2">
          <p className="text-xl">There is no transactions</p>
          <Link href="/movies" className={cn(buttonVariants())}>
            Buy Your First Ticket!
          </Link>
        </div>
      )}
    </section>
  );
};

export default Transaction;
