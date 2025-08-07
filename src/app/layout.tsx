import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageFooter from "./containers/PageFooter";
import AnimatedBackground from "./components/AnimatedBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Review",
  description: "Find out more about your favourite and recents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screen w-screen max-h-screen max-w-screen overscroll-none`}
      >
        <AnimatedBackground />
        {children}
        <PageFooter />
      </body>
    </html>
  );
}
