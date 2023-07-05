import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import loginImage from "../../../public/images/login-image.jpg";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sea Cinema - Login",
  description:
    "Log in to your Sea Cinema account and access exclusive features, personalized recommendations, and ticket booking options. Enjoy a seamless movie-watching experience with Sea Cinema.",
};

const Login = () => {
  return (
    <div className="container relative grid h-screen flex-col items-center justify-center md:max-w-none md:grid-cols-2 md:px-0">
      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Register
      </Link>
      <div className="relative hidden h-full flex-col justify-end bg-muted p-10 text-white dark:border-r md:flex">
        <div className="absolute inset-0 bg-zinc-900 object-contain">
          <Image
            src={loginImage}
            alt="Auth Image"
            priority
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative space-y-2">
          <h2 className="text-xl font-semibold">Sea Sinema</h2>
          <p className="text-sm font-medium">
            Enjoy an unforgettable experience watching movies at Sea Cinema,
            with the best picture and sound quality.
          </p>
        </div>
      </div>
      <div className="max-h-screen overflow-auto lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back to sea cinema
            </h1>
            <p className="text-sm text-muted-foreground">Enjoy your movie!</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
