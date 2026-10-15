"use client";

import Link from "next/link";
import { useStore } from "@/components/StoreProvider";
import { formatBirr } from "@/lib/dishes";
import { ChefHat, ShieldAlert, ArrowRight } from "lucide-react";

const statuses = ["Received", "Preparing", "Ready", "Completed"];

export default function KitchenPage() {
  const { user, orders, updateOrderStatus, ready } = useStore();
  if (!ready) return <section className="container page-section"><p>Loading kitchen…</p></section>;
  if (user?.role !== "kitchen") return <section className="container page-section empty-state"><span><ShieldAlert size={42} /></span><h1>Kitchen access only</h1><p>Sign in with the demo kitchen staff account to manage orders.</p><Link href="/signin?next=/kitchen" className="button button-primary">Kitchen sign in <ArrowRight size={17} /></Link></section>;
  return <section className="container page-section"><div className="page-heading align-left"><span className="section-kicker">BACK OF HOUSE</span><h1>Kitchen <em>dashboard.</em></h1><p>Review incoming orders and keep every meal moving.</p></div><div className="kitchen-stats"><div><span>All orders</span><b>{orders.length}</b></div><div><span>In progress</span><b>{orders.filter((o) => !["Completed"].includes(o.status)).length}</b></div><div><span>Completed</span><b>{orders.filter((o) => o.status === "Completed").length}</b></div></div>{!orders.length ? <div className="empty-state"><span><ChefHat size={40} /></span><h2>No orders have arrived</h2><p>Customer demo orders will appear here in this browser.</p><Link href="/menu" className="button button-primary">Preview menu</Link></div> : <div className="kitchen-orders">{orders.map((order) => <article className="kitchen-order" key={order.id}><div className="kitchen-order-header"><div><span className="order-id">{order.id}</span><h2>{order.details?.name || "Customer"}</h2><p>{order.customerEmail} · {order.details?.phone}</p></div><b>{formatBirr(order.total + 50)}</b></div><div className="kitchen-order-items">{order.items.map((item) => <span key={item.id}>{item.emoji} {item.name} × {item.quantity}</span>)}</div><p className="kitchen-address"><b>Delivery:</b> {order.details?.address}</p>{order.details?.notes && <p className="kitchen-address"><b>Notes:</b> {order.details.notes}</p>}<label className="status-select-label">Update status<select value={order.status} onChange={(event) => updateOrderStatus(order.id, event.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label></article>)}</div>}</section>;
}
