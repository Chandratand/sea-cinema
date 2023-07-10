import { cn } from "@/lib/utils";

interface SeatProps {
  number?: number;
  isSelected?: boolean;
  onSelect?: (number: number) => void;
  disabled?: boolean;
  isBooked?: boolean;
  description?: string;
}

const Seat = ({
  number,
  isSelected = false,
  onSelect,
  disabled = false,
  isBooked = false,
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
      <button
        type="button"
        disabled={disabled}
        className={seatStyle}
        onClick={handleClick}
      >
        {number}
      </button>
      {description ? <p className="font-medium">{description}</p> : null}
    </div>
  );
};

export default Seat;
