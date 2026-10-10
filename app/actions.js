"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import {
  createLoginSession,
  destroySession,
  getSession,
} from "@/lib/session";

const users = [
  {
    id: "customer-1",
    email: "customer@addiseats.com",
    password: "Customer2026!",
    role: "customer",
  },
  {
    id: "kitchen-1",
    email: "kitchen@addiseats.com",
    password: "Kitchen2026!",
    role: "kitchen",
  },
];

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function getSafeRedirectPath(value, role) {
  const fallback = role === "kitchen" ? "/kitchen" : "/orders";

  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return fallback;
  }

  try {
    const parsed = new URL(value, "http://addis-eats.local");

    if (parsed.origin !== "http://addis-eats.local") {
      return fallback;
    }

    const allowedPaths = ["/orders", "/checkout", "/kitchen"];

    if (!allowedPaths.includes(parsed.pathname)) {
      return fallback;
    }

    if (role === "customer" && parsed.pathname === "/kitchen") {
      return "/orders";
    }

    if (role === "kitchen" && parsed.pathname !== "/kitchen") {
      return "/kitchen";
    }

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}

export async function signIn(formData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    redirect("/signin?error=invalid");
  }

  const email = parsed.data.email.trim().toLowerCase();

  const user = users.find(
    (item) =>
      item.email === email && item.password === parsed.data.password,
  );

  if (!user) {
    redirect("/signin?error=invalid");
  }

  await createLoginSession(user);

  const requestedPath = formData.get("next");

  redirect(getSafeRedirectPath(requestedPath, user.role));
}

export async function signOut() {
  await destroySession();
  redirect("/signin");
}

export async function getCurrentUser() {
  return getSession();
}