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
import { Button } from "../ui/button";
import LoadingIndicator from "../LoadingIndicator";

const CreateTransactionAlert = ({
  onContinue,
  disabled = false,
  isLoading = false,
}: {
  onContinue: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={disabled || isLoading}>
          {isLoading && <LoadingIndicator />}
          Submit
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
          <AlertDialogAction asChild>
            <Button onClick={onContinue}>Continue</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateTransactionAlert;
