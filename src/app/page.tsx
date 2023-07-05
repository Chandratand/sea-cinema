import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Home = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-top before:absolute before:left-0 before:top-0  before:block before:h-screen before:w-full before:bg-black/5 before:content-['']"
      style={{
        backgroundImage: `url('/images/landing-image.jpg')`,
      }}
    >
      <div className="container relative flex h-full flex-col items-center justify-center gap-4 text-center text-white">
        <h1 className="text-3xl font-bold">Sea Cinema</h1>
        <div className="max-w-[500px]">
          <p className="text-sm font-medium ">
            Enjoy an unforgettable experience watching movies at Sea Cinema,
            with the best picture and sound quality.
          </p>
        </div>
        <Link
          href="/movies"
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          Buy Ticket Now
        </Link>
      </div>
    </section>
  );
};

export default Home;
