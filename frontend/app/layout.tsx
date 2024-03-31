import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SubLayout } from "./sub-layout";
import Head from "next/head";
import Script from "next/script";
import { motion, useTransform, useViewportScroll } from "framer-motion";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kyte Assignment",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SubLayout>{children}</SubLayout>
      </body>
    </html>
  );
}
