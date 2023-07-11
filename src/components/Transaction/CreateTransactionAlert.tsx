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
          <AlertDialogTitle>Ticket Purchase Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Make sure you have selected the correct number of tickets and movie.
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
