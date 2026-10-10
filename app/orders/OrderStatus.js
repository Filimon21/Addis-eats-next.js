"use client";

import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    const error = new Error("Could not refresh order status.");
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default function OrderStatus({ orderId, initialStatus }) {
  const { data, error } = useSWR(
    `/api/orders/${encodeURIComponent(orderId)}/status`,
    fetcher,
    {
      fallbackData: {
        id: orderId,
        status: initialStatus,
      },
      refreshInterval: 5000,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    },
  );

  const status = data?.status || initialStatus;

  const colors = {
    Confirmed: "bg-blue-100 text-blue-800",
    Preparing: "bg-orange-100 text-orange-800",
    Ready: "bg-green-100 text-green-800",
    Delivered: "bg-emerald-100 text-emerald-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <span
        aria-live="polite"
        className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
          colors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>

      <p className="mt-1 text-xs text-gray-500">
        {error
          ? "Could not refresh status."
          : "Status checks every 5 seconds."}
      </p>
    </div>
  );
}