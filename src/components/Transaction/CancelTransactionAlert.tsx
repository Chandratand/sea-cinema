"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import LoadingIndicator from "../LoadingIndicator";

const CancelTransactionAlert = ({
  onContinue,
  isLoading = false,
}: {
  onContinue: () => void;
  isLoading?: boolean;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isLoading}>
          {isLoading && <LoadingIndicator />}
          Cancel Tickets
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to cancel tickets?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Money will be refunded after cancelation
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            asChild
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            <Button onClick={onContinue}>Continue</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelTransactionAlert;
