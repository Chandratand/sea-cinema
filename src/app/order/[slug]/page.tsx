import slugify from "slugify";
import { Movie } from "../../../lib/data-types";
import SeatSelect from "../../../components/Transaction/SeatSelect";

async function getMovieDetail(
  slug: string
): Promise<{ movie: Movie; unAvailableSeats: number[] }> {
  const res = await fetch("https://seleksi-sea-2023.vercel.app/api/movies");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const movies = await res.json();

  const movie = movies.find(
    (item: Movie) => slugify(item.title.replace(":", "")) === slug
  );

  const soldSeatRes = await fetch(
    `${process.env.BASE_URL}/api/movies/${movie.id}/sold-seats`,
    { cache: "no-cache" }
  );
  if (!soldSeatRes.ok) {
    throw new Error("Failed to fetch data");
  }
  const soldSeat = await soldSeatRes.json();

  return { movie, unAvailableSeats: soldSeat?.data };
}

const Order = async ({ params }: { params: { slug: string } }) => {
  const { movie, unAvailableSeats } = await getMovieDetail(params.slug);

  return (
    <section className="container py-4 pb-10">
      <SeatSelect movie={movie} unAvailableSeats={unAvailableSeats} />
    </section>
  );
};

export default Order;
