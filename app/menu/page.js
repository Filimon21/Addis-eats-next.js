import Link from "next/link";
import MenuBrowser from "./MenuBrowser";
import { dishes } from "@/lib/dishes";

export const metadata = {
  title: "Menu | Addis Eats",
  description:
    "Explore traditional Ethiopian dishes, including Doro Wot, Tibs, Kitfo, Shiro, and Beyaynetu.",
  openGraph: {
    title: "Explore the Addis Eats Menu",
    description: "Discover Ethiopian food and traditional flavors.",
    type: "website",
  },
};

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-5 py-12 text-gray-900 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="font-semibold text-orange-700">
          ← Back to Home
        </Link>

        <header className="mb-10 mt-8">
          <p className="font-semibold uppercase tracking-widest text-orange-600">
            Eat Local. Eat Happy.
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Our Ethiopian Menu
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Discover the flavors of Ethiopia, from traditional favorites to
            delicious vegetarian dishes.
          </p>
        </header>

        <MenuBrowser initialDishes={dishes} />
      </div>
    </main>
  );
}