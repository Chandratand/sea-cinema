import Image from "next/image";
import { cn } from "@/lib/utils";
import { Movie } from "@/lib/data-types";

interface MovieCardProps extends React.HTMLAttributes<HTMLDivElement> {
  movie: Movie;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  coverOnly?: boolean;
}

const MovieCard = ({
  movie,
  aspectRatio = "portrait",
  width,
  height,
  coverOnly,
  className,
  ...props
}: MovieCardProps) => {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md shadow-md">
        <Image
          src={movie.poster_url}
          alt={movie.title}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      {!coverOnly && (
        <div className="space-y-1">
          <h3 className="font-semibold uppercase leading-none">
            {movie.title}
          </h3>
          <p className="text-sm font-medium text-muted-foreground">
            {movie.age_rating}+
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
