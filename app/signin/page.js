"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LockKeyhole, UtensilsCrossed } from "lucide-react";
import { useStore } from "@/components/StoreProvider";

export default function SignInPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { signIn } = useStore();
  const [email, setEmail] = useState("customer@addiseats.com");
  const [password, setPassword] = useState("Customer2026!");
  const [error, setError] = useState("");
  const [showKitchen, setShowKitchen] = useState(false);
  function submit(event) {
    event.preventDefault();
    const customer = email.trim().toLowerCase() === "customer@addiseats.com" && password === "Customer2026!";
    const kitchen = email.trim().toLowerCase() === "kitchen@addiseats.com" && password === "Kitchen2026!";
    if (!customer && !kitchen) { setError("Email or password is incorrect. Use one of the demo accounts shown below."); return; }
    const user = signIn(email.trim().toLowerCase(), kitchen ? "kitchen" : "customer");
    const requested = params.get("next");
    const safeNext = requested && requested.startsWith("/") && !requested.startsWith("//") ? requested : (user.role === "kitchen" ? "/kitchen" : "/orders");
    router.push(safeNext);
  }
  return <section className="container signin-layout"><div className="signin-art"><div className="signin-art-icon"><UtensilsCrossed size={44} /></div><span className="section-kicker">WELCOME TO THE TABLE</span><h2>Good food.<br /><em>Good people.</em><br />Great memories.</h2><p>Come hungry. Leave happy.</p><div className="signin-decoration">🍛 🫓 ☕</div></div><div className="signin-panel"><span className="signin-icon"><LockKeyhole size={22} /></span><h1>Welcome <em>back.</em></h1><p>Sign in to continue to Addis Eats.</p><form className="signin-form" onSubmit={submit}><label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary button-full" type="submit">Sign in</button></form><button className="demo-toggle" onClick={() => setShowKitchen(!showKitchen)}>{showKitchen ? "Hide" : "Show"} demo login credentials</button>{showKitchen && <div className="demo-credentials"><b>Customer</b><span>customer@addiseats.com</span><span>Customer2026!</span><hr /><b>Kitchen staff</b><span>kitchen@addiseats.com</span><span>Kitchen2026!</span></div>}<p className="signin-footnote">Demo authentication only. Accounts are hardcoded for coursework and are not secure for production use.</p><Link className="back-home" href="/">← Back to home</Link></div></section>;
}
