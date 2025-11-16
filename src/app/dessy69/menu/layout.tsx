import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dessy 69 Menu | Mysuru Restaurant",
    template: "%s | Dessy 69",
  },
  description:
    "Explore our delicious menu featuring authentic cuisines, starters, main courses, desserts, and beverages. Available for dine-in and takeaway in Mysuru.",
  keywords: [
    "Dessy 69 menu",
    "Mysuru restaurant",
    "restaurant menu Mysuru",
    "food delivery Mysuru",
    "best restaurant in Mysuru",
    "dine-in Mysuru",
    "takeaway food",
    "authentic cuisine",
    "desserts Mysuru",
    "beverages menu",
  ],
  authors: [{ name: "Dessy 69" }],
  creator: "Dessy 69 Restaurant",
  publisher: "Dessy 69 Restaurant",
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/dessy69/menu",
    title: "Dessy 69 Restaurant Menu - Mysuru",
    description:
      "Explore our delicious menu featuring authentic cuisines, starters, main courses, desserts, and beverages. Visit us in Mysuru for an unforgettable dining experience.",
    images: [
      {
        url: "/dessy.jpg",
        width: 1200,
        height: 630,
        alt: "Dessy 69 Restaurant Menu",
      },
    ],
    siteName: "Dessy 69 Restaurant",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dessy 69 Menu - Mysuru's Finest Restaurant",
    description: "Delicious food, great ambiance. Check out our complete menu!",
    images: ["/dessy.jpg"],
  },
  alternates: {
    canonical: "/dessy69/menu",
  },
  other: {
    "theme-color": "#ff6b35",
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black ">
      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
