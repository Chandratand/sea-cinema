"use client";

import React, { useState } from "react";
import Seat from "@/components/Seat";
import { Button } from "@/components/ui/button";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatSelection = (seatIndex: number) => {
    const updatedSeats = [...selectedSeats];

    if (updatedSeats.includes(seatIndex)) {
      updatedSeats.splice(updatedSeats.indexOf(seatIndex), 1);
    } else {
      updatedSeats.push(seatIndex);
    }

    setSelectedSeats(updatedSeats);
  };
  return (
    <>
      <div className="overflow-x-scroll sm:overflow-auto">
        <div className="mx-auto grid w-[500px] grid-cols-8 gap-2 rounded-md border p-4">
          {Array.from({ length: 64 }, (_, index) => (
            <Seat
              key={index + 1}
              number={index + 1}
              isSelected={selectedSeats.includes(index + 1)}
              onSelect={() => handleSeatSelection(index + 1)}
              disabled={
                selectedSeats.length > 5 && !selectedSeats.includes(index + 1)
              }
            />
          ))}
          <div className="col-span-8">
            <div className="my-2 flex justify-evenly">
              <Seat disabled description="available" />
              <Seat disabled isSelected description="selected" />
              <Seat disabled isBooked description="not available" />
            </div>
            <p className="font-medium text-destructive">
              *you can only select 6 seats per transaction
            </p>
          </div>
        </div>
      </div>
      <Button className="mt-2 w-full">Submit</Button>
    </>
  );
};

export default SeatSelection;
