import "./globals.css";
import Header from "@/components/header/Header";
import { Space_Grotesk, Inter } from "next/font/google";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable}`}
      >
        <Header />
        {children}
        <Toaster richColors />
      
      </body>
    </html>
  );
}
