import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { dishes } from "@/lib/dishes";
import { placeOrder } from "@/app/order-actions";
export const instant = false;

export const metadata = {
  title: "Checkout | Addis Eats",
  robots: {
    index: false,
    follow: false,
  },
};


export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Fcheckout");
  }

  if (session.role !== "customer") {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-orange-50 px-5 py-12 text-gray-900">
      <div className="mx-auto max-w-2xl">
        <Link href="/menu" className="font-semibold text-orange-700">
          ← Back to Menu
        </Link>

        <h1 className="mt-6 text-4xl font-extrabold">Checkout</h1>

        <p className="mt-3 text-gray-600">
          Select a dish to create a demo order.
        </p>

        <form action={placeOrder} className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <label htmlFor="dishId" className="mb-2 block font-semibold">
            Select a dish
          </label>

          <select
            id="dishId"
            name="dishId"
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
          >
            {dishes.map((dish) => (
              <option key={dish.id} value={dish.id}>
                {dish.name} — {dish.price} ETB
              </option>
            ))}
          </select>

          <p className="mt-4 text-sm text-gray-500">
            This coursework demo creates one item per order. Payment processing
            is not implemented.
          </p>

          <button
            type="submit"
            className="mt-6 rounded-xl bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700"
          >
            Place Demo Order
          </button>
        </form>
      </div>
    </main>
  );
}