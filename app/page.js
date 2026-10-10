import Link from "next/link";

const siteUrl = (
process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

const structuredData = {
"@context": "https://schema.org",
"@type": "WebSite",
name: "Addis Eats",
description:
"Discover Ethiopian dishes, explore traditional flavors, and order your favorites with Addis Eats.",
url: siteUrl,
};

export const metadata = {
metadataBase: new URL(siteUrl),
title: "Addis Eats | Ethiopian Food Ordering",
description:
"Discover delicious Ethiopian food, explore traditional dishes, and enjoy a great food experience with Addis Eats.",
openGraph: {
title: "Addis Eats | Ethiopian Food Ordering",
description:
"Discover Ethiopian dishes and explore traditional flavors.",
url: siteUrl,
siteName: "Addis Eats",
type: "website",
},
twitter: {
card: "summary",
title: "Addis Eats | Ethiopian Food Ordering",
description:
"Discover Ethiopian dishes and explore traditional flavors.",
},
};

export default function HomePage() {
return ( <main className="min-h-screen bg-orange-50 text-gray-900">
<script
type="application/ld+json"
dangerouslySetInnerHTML={{
__html: JSON.stringify(structuredData).replace(/</g, "\u003c"),
}}
/>

```
  <header className="flex items-center justify-between border-b bg-white px-6 py-5 md:px-12">
    <Link href="/" className="text-2xl font-bold text-orange-600">
      Addis Eats
    </Link>

    <nav className="flex items-center gap-5">
      <Link href="/menu" className="hover:text-orange-600">
        Menu
      </Link>

      <Link href="/signin" className="hover:text-orange-600">
        Sign In
      </Link>
    </nav>
  </header>

  <section className="mx-auto max-w-6xl px-6 py-20 text-center md:py-32">
    <p className="mb-4 font-semibold uppercase tracking-widest text-orange-600">
      Authentic Ethiopian Flavors
    </p>

    <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
      Eat Local. <span className="text-orange-600">Eat Happy.</span>
    </h1>

    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
      Discover your favorite Ethiopian dishes, explore traditional flavors,
      and enjoy a delicious food experience with Addis Eats.
    </p>

    <div className="mt-9 flex flex-wrap justify-center gap-4">
      <Link
        href="/menu"
        className="rounded-xl bg-orange-600 px-7 py-4 font-semibold text-white hover:bg-orange-700"
      >
        Explore Our Menu
      </Link>

      <Link
        href="/signin"
        className="rounded-xl border border-orange-600 px-7 py-4 font-semibold text-orange-700 hover:bg-orange-100"
      >
        Sign In
      </Link>
    </div>

    <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
      <article className="overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-shadow hover:shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop"
          alt="A delicious meal with fresh ingredients"
          className="h-48 w-full object-cover"
          loading="lazy"
        />

        <div className="p-6">
          <h2 className="font-bold">Traditional Food</h2>
          <p className="mt-2 text-sm text-gray-600">
            Explore delicious traditional food and local favorites.
          </p>
        </div>
      </article>

      <article className="overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-shadow hover:shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop"
          alt="Fresh vegetables and a colorful meal"
          className="h-48 w-full object-cover"
          loading="lazy"
        />

        <div className="p-6">
          <h2 className="font-bold">Fresh Flavors</h2>
          <p className="mt-2 text-sm text-gray-600">
            Discover delicious dishes for every taste.
          </p>
        </div>
      </article>

      <article className="overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-shadow hover:shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop"
          alt="A freshly prepared meal"
          className="h-48 w-full object-cover"
          loading="lazy"
        />

        <div className="p-6">
          <h2 className="font-bold">Easy Ordering</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enjoy a convenient food-ordering experience with Addis Eats.
          </p>
        </div>
      </article>
    </div>
  </section>

  <footer className="border-t bg-white px-6 py-6 text-center text-sm text-gray-500">
    © 2026 Addis Eats. Built with Next.js.
  </footer>
</main>


);
}

