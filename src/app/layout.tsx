import { Poppins } from "next/font/google";
import Navigation from "@/components/Navigation";
import NextAuthProvider from "@/components/NextAuthProvider";
import { Toaster } from "@/components/ui/toaster";
import "../styles/global.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata = {
  title: "Sea Cinema",
  description:
    "Enjoy an unforgettable experience watching movies at Sea Cinema, with the best picture and sound quality.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <Navigation />
          {children}
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
