import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

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
    <ClerkProvider signInUrl="/login" signUpUrl="/signup" afterSignOutUrl={"/"} >
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}

// signInUrl="/login" signUpUrl="/signup" afterSignOutUrl={"/"}
