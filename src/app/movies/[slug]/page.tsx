import moment from "moment";
import Link from "next/link";
import slugify from "slugify";
import MovieCard from "@/components/MovieCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Movie } from "../../../lib/data-types";
import { nominalFormat } from "@/lib/formater";
import { cn } from "@/lib/utils";
import "moment/locale/id";

// export async function generateStaticParams() {
//   const res = await fetch("https://seleksi-sea-2023.vercel.app/api/movies");
//   const movies = await res.json();

//   return movies.map((movie: Movie) => ({
//     slug: slugify(movie.title),
//   }));
// }

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

const MovieDetail = async ({ params }: { params: { slug: string } }) => {
  const movie = await getMovieDetail(params.slug);
  const bg = movie?.poster_url;

  return (
    <section
      className="relative h-screen bg-cover bg-top before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full before:bg-black/50 before:content-[''] sm:flex sm:max-h-[720px] sm:items-center"
      style={{
        backgroundImage: `url(
          ${bg}
        )`,
      }}
    >
      <div className="container relative flex flex-wrap gap-1 py-4 sm:gap-8">
        <div className="flex w-full justify-center sm:w-fit">
          <MovieCard
            movie={movie}
            className="w-[250px]"
            aspectRatio="portrait"
            width={250}
            height={330}
            coverOnly
          />
        </div>
        <div className="flex-1 space-y-2 sm:space-y-4">
          <h1 className="text-xl font-semibold tracking-tight text-primary-foreground sm:text-3xl">
            {movie?.title}
          </h1>
          <Badge variant="destructive">{movie?.age_rating}+</Badge>
          <p className="text-primary-foreground">{movie?.description}</p>
          <div>
            <p className="mb-2 text-primary-foreground">
              Tanggal tayang :{" "}
              {moment(movie?.release_date).format("DD MMMM YYYY")}
            </p>
            <p className="mb-4 text-xl font-semibold text-primary-foreground">
              {nominalFormat(movie?.ticket_price)}
            </p>
            <Link
              href={`/movies/${params.slug}/order`}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Buy a Ticket
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;
