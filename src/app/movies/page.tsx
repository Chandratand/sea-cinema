import React from "react";
import Link from "next/link";
import slugify from "slugify";
import { Movie } from "../../lib/data-types";
import MovieCard from "@/components/MovieCard";

async function getData(): Promise<Movie[]> {
  const res = await fetch("https://seleksi-sea-2023.vercel.app/api/movies");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Movies = async () => {
  const movies = await getData();
  return (
    <div className="container py-4">
      <div className="flex flex-wrap items-center justify-evenly gap-4">
        {movies.map((movie) => (
          <Link href={`/movies/${slugify(movie.title.replace(":", ""))}`}>
            <MovieCard
              key={movie.id}
              movie={movie}
              className="w-[250px]"
              aspectRatio="portrait"
              width={250}
              height={330}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
