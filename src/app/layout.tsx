import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
        <body>
          {/* <Navbar /> */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

// signInUrl="/login" signUpUrl="/signup" afterSignOutUrl={"/"}
