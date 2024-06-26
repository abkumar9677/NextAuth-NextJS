import type { Metadata } from "next";
import "./globals.css";
import Nav from "./(components)/Nav";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-gray-100 h-full" suppressHydrationWarning={true}>
        <Nav />
        <div className="m-2">{children}</div>
      </body>
    </html>
  );
}
