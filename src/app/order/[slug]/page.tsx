import slugify from "slugify";
import { Movie } from "../../../lib/data-types";
import SeatSelect from "../../../components/Transaction/SeatSelect";

async function getMovieDetail(slug: string): Promise<Movie> {
  const res = await fetch("https://seleksi-sea-2023.vercel.app/api/movies", {
    cache: "no-cache",
  });
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
    <section className="container py-4 pb-10">
      <SeatSelect movie={movie} />
    </section>
  );
};

export default Order;
