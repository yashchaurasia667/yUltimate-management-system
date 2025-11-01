import type { Metadata } from "next";
import Navbar from "../../components/navbar";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "yutlimate",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
