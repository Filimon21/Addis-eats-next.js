"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useStore } from "@/components/StoreProvider";
import { formatBirr } from "@/lib/dishes";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, placeOrder, user, ready } = useStore();
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "", address: "", notes: "" });
  function change(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  function submit(event) {
    event.preventDefault();
    if (!cart.length) { setError("Your cart is empty. Add a dish before checking out."); return; }
    if (!form.name.trim() || !form.email.includes("@") || !form.phone.trim() || !form.address.trim()) { setError("Please complete your name, valid email, phone, and delivery address."); return; }
    const order = placeOrder(form);
    setDone(true);
    setTimeout(() => router.push(`/orders?new=${order.id}`), 1200);
  }
  if (!ready) return <section className="container page-section"><p>Loading checkout…</p></section>;
  if (done) return <section className="container page-section success-state"><CheckCircle2 size={56} /><h1>Order received!</h1><p>Your demo order has been created. Taking you to your orders…</p></section>;
  if (!cart.length) return <section className="container page-section empty-state"><h1>Your cart is empty</h1><p>Add dishes before checking out.</p><Link href="/menu" className="button button-primary">Browse menu</Link></section>;
  return <section className="container page-section"><Link href="/cart" className="back-link"><ArrowLeft size={16} /> Back to cart</Link><div className="page-heading align-left checkout-heading"><span className="section-kicker">ALMOST THERE</span><h1>Let's get it <em>to you.</em></h1><p>Enter your delivery details to place your demo order.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><h2>Delivery details</h2><div className="form-grid"><label>Full name<input name="name" value={form.name} onChange={change} required placeholder="Your name" /></label><label>Email address<input type="email" name="email" value={form.email} onChange={change} required placeholder="you@example.com" /></label><label>Phone number<input name="phone" value={form.phone} onChange={change} required placeholder="+251 9..." /></label><label className="full-field">Delivery address<textarea name="address" value={form.address} onChange={change} required rows="3" placeholder="Street, area, landmark..." /></label><label className="full-field">Delivery notes <span className="optional-label">(optional)</span><textarea name="notes" value={form.notes} onChange={change} rows="2" placeholder="Anything the kitchen or courier should know?" /></label></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary button-full" type="submit">Place demo order · {formatBirr(cartTotal + 50)}</button><p className="demo-notice">Coursework demo only: this does not process real payments or dispatch a delivery.</p></form><aside className="order-summary"><h2>Your order</h2>{cart.map((item) => <div className="checkout-item" key={item.id}><span>{item.emoji} {item.name} × {item.quantity}</span><b>{formatBirr(item.price * item.quantity)}</b></div>)}<div className="summary-line"><span>Subtotal</span><b>{formatBirr(cartTotal)}</b></div><div className="summary-line"><span>Delivery</span><b>{formatBirr(50)}</b></div><div className="summary-line summary-total"><span>Total</span><b>{formatBirr(cartTotal + 50)}</b></div></aside></div></section>;
}
