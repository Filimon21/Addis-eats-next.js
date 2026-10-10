import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllOrders } from "@/lib/orders";
import { updateKitchenOrderStatus } from "@/app/order-actions";
import { signOut } from "@/app/actions";
export const instant = false;

export const metadata = {
  title: "Kitchen Dashboard | Addis Eats",
  robots: {
    index: false,
    follow: false,
  },
};


export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Fkitchen");
  }

  if (session.role !== "kitchen") {
    redirect("/");
  }

  const orders = getAllOrders();

  return (
    <main className="min-h-screen bg-orange-50 px-5 py-12 text-gray-900 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="font-semibold text-orange-700">
            ← Home
          </Link>

          <form action={signOut}>
            <button
              type="submit"
              className="rounded-lg border border-gray-300 px-4 py-2 font-semibold"
            >
              Sign Out
            </button>
          </form>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold">Kitchen Dashboard</h1>

        <p className="mt-3 text-gray-600">
          Review orders and update their status.
        </p>

        <div className="mt-8 space-y-5">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{order.id}</h2>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800">
                  {order.status}
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-gray-600">
                {order.items.map((item) => (
                  <li key={item.dishId}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>

              {order.status !== "Delivered" &&
                order.status !== "Cancelled" && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {["Preparing", "Ready", "Delivered"].map((status) => (
                      <form
                        key={status}
                        action={async () => {
                          "use server";
                          await updateKitchenOrderStatus(order.id, status);
                        }}
                      >
                        <button
                          type="submit"
                          className="rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-700"
                        >
                          Mark {status}
                        </button>
                      </form>
                    ))}
                  </div>
                )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}