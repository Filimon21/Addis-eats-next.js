import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersForUser } from "@/lib/orders";
import { cancelOrder } from "@/app/order-actions";
import OrderStatus from "./OrderStatus";
export const instant = false;

export const metadata = {
  title: "My Orders | Addis Eats",
  description: "View your Addis Eats order history and status.",
  robots: {
    index: false,
    follow: false,
  },
};


export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Forders");
  }

  if (session.role !== "customer") {
    redirect("/");
  }

  const orders = getOrdersForUser(session.id);

  return (
    <main className="min-h-screen bg-orange-50 px-5 py-12 text-gray-900 md:px-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="font-semibold text-orange-700">
          ← Home
        </Link>

        <h1 className="mt-6 text-4xl font-extrabold">My Orders</h1>

        <p className="mt-3 text-gray-600">
          Welcome, {session.email}. Here are your orders.
        </p>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
            <p>You have no orders yet.</p>

            <Link
              href="/menu"
              className="mt-4 inline-block font-semibold text-orange-700"
            >
              Explore the menu →
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {orders.map((order) => {
              const total = order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
              );

              return (
                <article
                  key={order.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-bold">{order.id}</h2>

                    <OrderStatus
                      orderId={order.id}
                      initialStatus={order.status}
                    />
                  </div>

                  <ul className="mt-4 space-y-2">
                    {order.items.map((item) => (
                      <li
                        key={item.dishId}
                        className="flex justify-between gap-4 text-gray-600"
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>

                        <span>{item.price * item.quantity} ETB</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 border-t pt-4 font-bold">
                    Total: {total} ETB
                  </div>

                  {order.status === "Confirmed" && (
                    <form
                      action={async () => {
                        "use server";
                        await cancelOrder(order.id);
                      }}
                      className="mt-4"
                    >
                      <button
                        type="submit"
                        className="rounded-lg border border-red-300 px-4 py-2 font-semibold text-red-700 hover:bg-red-50"
                      >
                        Cancel Order
                      </button>
                    </form>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/menu"
            className="rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white"
          >
            Browse Menu
          </Link>

          <form action={async () => {
            "use server";
            const { signOut } = await import("@/app/actions");
            await signOut();
          }}>
            <button
              type="submit"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}