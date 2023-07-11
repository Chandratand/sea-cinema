"use client";

import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transactions } from "@/lib/data-types";
import { nominalFormat } from "@/lib/formater";
import { useToast } from "../ui/use-toast";
import CancelTransactionAlert from "./CancelTransactionAlert";

const TransactionCard = ({
  transaction,
  onCancel,
}: {
  transaction: Transactions;
  onCancel?: (transactionId: number) => void;
}) => {
  const { update } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCancelTransaction = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/transaction/${transaction.id}`);
      toast({
        title: "Ticket Berhasil di cancel!",
      });
      if (onCancel) {
        onCancel(transaction.id);
      }
      update();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Insufficient balance",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <p className="text-lg font-bold">
            Ticket ID : {transaction.id}
            <br />
            {transaction.movieTitle}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="font-medium">
            Ticket Count : {transaction.ticketCount}
            <br />
            Seat Number : {transaction.seatNumbers?.join(", ")}
            <br />
            Total Pay : {nominalFormat(transaction.totalPrice)}
          </p>
        </div>
        <div className="mt-2 flex w-full items-center justify-between">
          <p className="text-sm text-secondary-foreground">
            {moment("2023-07-09T14:28:44.244Z").fromNow()}
          </p>
          <CancelTransactionAlert
            onContinue={handleCancelTransaction}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
