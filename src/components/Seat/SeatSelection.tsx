"use client";

import Seat from ".";

interface SeatSelectionProps {
  selectedSeats: number[];
  unAvailableSeats?: number[];
  onSeatChange: (updatedSeats: number[]) => void;
  isLoading?: boolean;
}

const SeatSelection = ({
  selectedSeats,
  unAvailableSeats = [],
  onSeatChange,
  isLoading = false,
}: SeatSelectionProps) => {
  const handleSeatSelection = (seatIndex: number) => {
    const updatedSeats = [...selectedSeats];

    if (updatedSeats.includes(seatIndex)) {
      updatedSeats.splice(updatedSeats.indexOf(seatIndex), 1);
    } else {
      updatedSeats.push(seatIndex);
    }
    onSeatChange(updatedSeats);
  };

  return (
    <div className="overflow-x-scroll sm:overflow-auto">
      <div className="mx-auto grid w-[500px] grid-cols-8 gap-2 rounded-md border p-4">
        <div className="col-span-8">
          <div className="my-2 flex justify-evenly">
            <Seat disabled description="Available" />
            <Seat disabled isSelected description="Your choice" />
            <Seat disabled isBooked description="Not available" />
          </div>
        </div>
        {Array.from({ length: 64 }, (_, index) => (
          <Seat
            key={index + 1}
            number={index + 1}
            isSelected={selectedSeats.includes(index + 1)}
            onSelect={() => handleSeatSelection(index + 1)}
            isBooked={unAvailableSeats.includes(index + 1)}
            disabled={
              unAvailableSeats.includes(index + 1) ||
              (selectedSeats.length > 5 && !selectedSeats.includes(index + 1))
            }
            isLoading={isLoading}
          />
        ))}
        <div className="col-span-8">
          <div className="mb-2 rounded-sm bg-muted py-1">
            <p className="text-center text-sm font-medium text-muted-foreground">
              SCREEN
            </p>
          </div>
          <p className="font-medium text-destructive">
            *you can only select 6 seats per transaction
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
