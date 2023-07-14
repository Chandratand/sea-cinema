import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface SeatProps {
  number?: number;
  isSelected?: boolean;
  onSelect?: (number: number) => void;
  disabled?: boolean;
  isBooked?: boolean;
  isLoading?: boolean;
  description?: string;
}

const Seat = ({
  number,
  isSelected = false,
  onSelect,
  disabled = false,
  isBooked = false,
  isLoading = false,
  description,
}: SeatProps) => {
  const seatStyle = cn(
    "flex h-10 w-10 items-center font-semibold justify-center rounded-lg border text-secondary-foreground bg-secondary",
    { "bg-primary text-primary-foreground": isSelected },
    { "bg-destructive text-destructive-foreground": isBooked }
  );

  const handleClick = () => {
    if (onSelect && number) {
      onSelect(number);
    }
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {isLoading ? (
        <Skeleton className="h-10 w-10 rounded-lg" />
      ) : (
        <button
          type="button"
          disabled={disabled}
          className={seatStyle}
          onClick={handleClick}
        >
          {number}
        </button>
      )}
      {description ? <p className="font-medium">{description}</p> : null}
    </div>
  );
};

export default Seat;
