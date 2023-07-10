"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CopyIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { topUpBalanceSchema } from "@/lib/validation-schema";
import { TopUpBalanceMethod } from "@/lib/data-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingIndicator from "../LoadingIndicator";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

interface TopUpBalanceModalProps {
  open?: boolean;
  onOpenChange: (value: boolean) => void;
  data?: TopUpBalanceMethod | null;
}

const TopUpBalanceModal = ({
  open,
  onOpenChange,
  data,
}: Partial<TopUpBalanceModalProps>) => {
  const { toast } = useToast();
  const { update } = useSession();
  const { replace } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [account, setAccount] = useState<string>("");

  const form = useForm<z.infer<typeof topUpBalanceSchema>>({
    resolver: zodResolver(topUpBalanceSchema),
    defaultValues: {
      amount: "",
    },
  });

  const getVirtualAccount = () => {
    const generatedAccount = Math.floor(
      100000000000 + Math.random() * 900000000000
    ).toString();
    setAccount(generatedAccount);
  };

  const copyVirtualAccount = () => {
    navigator.clipboard
      .writeText(account)
      .then(() => {
        toast({ title: "Virtual Account Copied!" });
      })
      .catch(() => {
        toast({ variant: "destructive", title: "Failed to Copy!" });
      });
  };

  const onSubmit = async (values: z.infer<typeof topUpBalanceSchema>) => {
    setIsLoading(true);
    try {
      await axios.post("/api/balance/top-up", values);
      form.reset();
      setSubmitted(true);
      getVirtualAccount();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message || error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {submitted ? (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transfer to this account</DialogTitle>
            <DialogDescription>
              The balance will be updated automatically after you make the
              transfer.
            </DialogDescription>
          </DialogHeader>

          <div>
            <div className="flex items-center justify-center">
              <p className="text-center text-xl font-bold">{data?.title}</p>
            </div>
            <div className="flex w-full items-center justify-center rounded-lg border px-3 py-4 sm:gap-4">
              <p className="flex-1 text-center text-lg font-semibold">
                {account}
              </p>
              <CopyIcon role="button" onClick={copyVirtualAccount} />
            </div>
          </div>

          <DialogTrigger asChild>
            <Button
              onClick={() => {
                update();
                replace("/balance");
              }}
            >
              Already made the transfer
            </Button>
          </DialogTrigger>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Top Up Nominal</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nominal</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Nominal"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <LoadingIndicator />}
                  Top Up Balance
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default TopUpBalanceModal;
