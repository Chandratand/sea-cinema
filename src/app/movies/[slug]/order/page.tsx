import slugify from "slugify";
import { Badge } from "@/components/ui/badge";
import { Movie } from "../../../../lib/data-types";
import SeatSelection from "./SeatSelection";

async function getMovieDetail(slug: string): Promise<Movie> {
  const res = await fetch("https://seleksi-sea-2023.vercel.app/api/movies");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const movies = await res.json();

  const movie = movies.find(
    (item: Movie) => slugify(item.title.replace(":", "")) === slug
  );

  return movie;
}

const Order = async ({ params }: { params: { slug: string } }) => {
  const movie = await getMovieDetail(params.slug);

  return (
    <section className="container flex flex-wrap gap-10 py-4 pb-10">
      <div className="flex flex-1 flex-col justify-center space-y-2 md:order-2">
        <div className="flex items-start gap-2">
          <h1 className="text-xl font-semibold tracking-tight sm:text-3xl">
            {movie?.title}
          </h1>
          <Badge variant="destructive">{movie?.age_rating}+</Badge>
        </div>
        <p>{movie?.description}</p>
      </div>
      <div className="mx-auto mt-5 overflow-hidden">
        <p className="mb-2 text-base font-bold">Select your Seat</p>
        <SeatSelection />
      </div>
    </section>
  );
};

export default Order;
