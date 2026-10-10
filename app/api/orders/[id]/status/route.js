import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getOrderForUser } from "@/lib/orders";


export async function GET(request, { params }) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required." },
      {
        status: 401,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  if (session.role !== "customer") {
    return NextResponse.json(
      { error: "Customer access required." },
      {
        status: 403,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  const { id } = await params;
  const order = getOrderForUser(id, session.id);

  if (!order) {
    return NextResponse.json(
      { error: "Order not found." },
      {
        status: 404,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  return NextResponse.json(
    {
      id: order.id,
      status: order.status,
      updatedAt: new Date().toISOString(),
    },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}