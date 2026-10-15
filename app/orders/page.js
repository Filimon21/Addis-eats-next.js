"use client";

import Link from "next/link";
import { PackageCheck, ArrowRight, Clock } from "lucide-react";
import { useStore } from "@/components/StoreProvider";
import { formatBirr } from "@/lib/dishes";

const steps = ["Received", "Preparing", "Ready", "Completed"];

export default function OrdersPage() {
  const { orders, user, ready } = useStore();
  const visibleOrders = user?.role === "kitchen" ? orders : orders.filter((order) => !user || order.customerEmail === user.email);
  if (!ready) return <section className="container page-section"><p>Loading orders…</p></section>;
  return <section className="container page-section"><div className="page-heading align-left"><span className="section-kicker">YOUR FOOD JOURNEY</span><h1>My <em>orders.</em></h1><p>Keep up with the progress of your delicious choices.</p></div>{!visibleOrders.length ? <div className="empty-state"><span><PackageCheck size={40} /></span><h2>No orders yet</h2><p>Your next great meal is just around the corner.</p><Link href="/menu" className="button button-primary">Browse menu <ArrowRight size={17} /></Link></div> : <div className="orders-list">{visibleOrders.map((order) => <article className="order-card" key={order.id}><div className="order-card-top"><div><span className="order-id">{order.id}</span><h2>{order.items.map((item) => `${item.name} × ${item.quantity}`).join(", ")}</h2><p><Clock size={14} /> {new Date(order.createdAt).toLocaleString()}</p></div><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></div><div className="order-progress">{steps.map((step, index) => <div key={step} className={`progress-step ${steps.indexOf(order.status) >= index ? "progress-done" : ""}`}><span>{index + 1}</span><small>{step}</small></div>)}</div><div className="order-card-bottom"><span>Total <b>{formatBirr(order.total + 50)}</b></span><span>Deliver to: {order.details?.address || "Address not provided"}</span></div></article>)}</div>}</section>;
}
