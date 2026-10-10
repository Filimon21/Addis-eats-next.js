import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { signIn } from "@/app/actions";
export const instant = false;

export const metadata = {
  title: "Sign In | Addis Eats",
  description: "Sign in to your Addis Eats account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SignInPage({ searchParams }) {
  const session = await getSession();

  if (session) {
    redirect(session.role === "kitchen" ? "/kitchen" : "/orders");
  }

  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "";
  const hasError = params.error === "invalid";

  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50 px-5 py-12 text-gray-900">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <Link href="/" className="font-bold text-orange-600">
          ← Addis Eats
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold">Welcome Back</h1>

        <p className="mt-2 text-gray-600">
          Sign in to access your account.
        </p>

        {hasError && (
          <p
            role="alert"
            className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            Invalid email or password. Please try again.
          </p>
        )}

        <form action={signIn} className="mt-7 space-y-5">
          <input type="hidden" name="next" value={next} />

          <div>
            <label htmlFor="email" className="mb-2 block font-semibold">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block font-semibold">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-700"
          >
            Sign In
          </button>
        </form>

        <div className="mt-7 rounded-xl bg-orange-50 p-4 text-sm">
          <p className="font-bold">Demo Customer</p>
          <p>customer@addiseats.com</p>
          <p>Customer2026!</p>

          <p className="mt-4 font-bold">Demo Kitchen Staff</p>
          <p>kitchen@addiseats.com</p>
          <p>Kitchen2026!</p>
        </div>
      </section>
    </main>
  );
}