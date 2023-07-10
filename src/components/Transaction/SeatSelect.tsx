"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SeatSelection from "@/components/Seat/SeatSelection";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Movie } from "@/lib/data-types";
import { nominalFormat } from "@/lib/formater";
import CreateTransactionAlert from "./CreateTransactionAlert";

const SeatSelect = ({
  movie,
  unAvailableSeats,
}: {
  movie: Movie;
  unAvailableSeats: number[];
}) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { replace } = useRouter();

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTotalPrice(selectedSeats.length * movie.ticket_price);
  }, [selectedSeats.length, movie.ticket_price]);

  const handleSubmit = async () => {
    const requestBody = {
      movieId: movie.id,
      movieTitle: movie.title,
      ticketPrice: movie.ticket_price,
      totalPrice,
      selectedSeats,
    };

    if (session?.user.age < movie.age_rating) {
      toast({
        variant: "destructive",
        title: "You can't buy this ticket!",
        description: "Oops, sorry you are under age.",
      });
    } else {
      setIsLoading(true);
      try {
        await axios.post("/api/transaction", requestBody);
        replace("/transactions");
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Insufficient balance",
          description: "Top Up your balance!",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className=" flex flex-wrap gap-10">
      <div className="order-2 flex flex-1 flex-col justify-center space-y-2">
        <div className="flex items-start gap-2">
          <h1 className="text-xl font-semibold tracking-tight sm:text-3xl">
            {movie?.title}
          </h1>
          <Badge variant="destructive">{movie?.age_rating}+</Badge>
        </div>
        <p>{movie?.description}</p>
        <div className="flex flex-col py-2 md:max-w-[200px]">
          <h2 className="text-lg font-semibold text-primary">Total Price</h2>
          <p className="font-medium text-primary">
            {nominalFormat(totalPrice)}
          </p>
          <CreateTransactionAlert
            onContinue={handleSubmit}
            disabled={selectedSeats.length < 1}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="mx-auto mt-5 overflow-hidden">
        <p className="mb-2 text-base font-bold">Select your Seat</p>
        <SeatSelection
          selectedSeats={selectedSeats}
          onSeatChange={setSelectedSeats}
          unAvailableSeats={unAvailableSeats}
        />
      </div>
    </div>
  );
};

export default SeatSelect;
