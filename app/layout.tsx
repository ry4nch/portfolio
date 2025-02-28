import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ryan Chin | Portfolio",
  description: "Portfolio showcasing my work in design and development",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png"
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ryan Chin | Portfolio",
    startupImage: [
      "/icon.PNG"
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/icon.PNG" type="image/png" />
        <meta name="msapplication-TileImage" content="/icon.PNG" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
