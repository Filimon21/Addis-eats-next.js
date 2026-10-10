"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getDishById } from "@/lib/dishes";
import {
  cancelOrderForUser,
  createOrderForUser,
  updateOrderStatus,
} from "@/lib/orders";

export async function placeOrder(formData) {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Fcheckout");
  }

  if (session.role !== "customer") {
    return {
      success: false,
      message: "Only customers can place orders.",
    };
  }

  const dishId = formData.get("dishId");

  if (typeof dishId !== "string") {
    return {
      success: false,
      message: "Please select a valid dish.",
    };
  }

  const dish = getDishById(dishId);

  if (!dish) {
    return {
      success: false,
      message: "Dish not found.",
    };
  }

  createOrderForUser(session.id, dish);

  revalidatePath("/orders");
  revalidatePath("/kitchen");

  redirect("/orders");
}

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "Please sign in first.",
    };
  }

  if (session.role !== "customer") {
    return {
      success: false,
      message: "Only customers can cancel orders.",
    };
  }

  if (typeof orderId !== "string" || !/^order-\d+$/.test(orderId)) {
    return {
      success: false,
      message: "Invalid order ID.",
    };
  }

  const result = cancelOrderForUser(orderId, session.id);

  if (result.success) {
    revalidatePath("/orders");
    revalidatePath("/kitchen");
  }

  return result;
}

export async function updateKitchenOrderStatus(orderId, status) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "Please sign in first.",
    };
  }

  if (session.role !== "kitchen") {
    return {
      success: false,
      message: "Kitchen staff access is required.",
    };
  }

  if (typeof orderId !== "string" || !/^order-\d+$/.test(orderId)) {
    return {
      success: false,
      message: "Invalid order ID.",
    };
  }

  if (!["Confirmed", "Preparing", "Ready", "Delivered"].includes(status)) {
    return {
      success: false,
      message: "Invalid order status.",
    };
  }

  const success = updateOrderStatus(orderId, status);

  if (success) {
    revalidatePath("/kitchen");
    revalidatePath("/orders");
  }

  return {
    success,
    message: success ? "Order status updated." : "Order not found.",
  };
}