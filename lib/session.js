import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "addis-eats-session";
const SESSION_DURATION = 60 * 60 * 24;

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET must be configured with at least 32 characters.",
    );
  }

  return secret;
}

function sign(value) {
  return createHmac("sha256", getSecret())
    .update(value)
    .digest("base64url");
}

export function createSessionToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );

  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifySessionToken(token) {
  try {
    if (typeof token !== "string") {
      return null;
    }

    const parts = token.split(".");

    if (parts.length !== 2) {
      return null;
    }

    const [encodedPayload, signature] = parts;

    const expectedSignature = Buffer.from(sign(encodedPayload));
    const receivedSignature = Buffer.from(signature);

    if (
      expectedSignature.length !== receivedSignature.length ||
      !timingSafeEqual(expectedSignature, receivedSignature)
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    );

    if (
      !payload.id ||
      !payload.email ||
      !["customer", "kitchen"].includes(payload.role) ||
      typeof payload.exp !== "number" ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function createLoginSession(user) {
  const cookieStore = await cookies();
  const token = createSessionToken(user);

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export async function requireSession() {
  const session = await getSession();

  if (!session) {
    throw new Error("Authentication required.");
  }

  return session;
}

export async function requireKitchen() {
  const session = await requireSession();

  if (session.role !== "kitchen") {
    throw new Error("Kitchen access required.");
  }

  return session;
}