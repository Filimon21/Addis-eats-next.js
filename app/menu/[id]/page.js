"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Star, Plus } from "lucide-react";
import { dishes, formatBirr } from "@/lib/dishes";
import { useStore } from "@/components/StoreProvider";

export default function DishDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useStore();
  const dish = dishes.find((item) => item.id === params.id);
  if (!dish) return <section className="container page-section empty-state"><h1>Dish not found</h1><Link href="/menu" className="button button-primary">Back to menu</Link></section>;
  return <section className="container page-section detail-layout"><div className="detail-art"><span className="dish-tag">{dish.tag}</span><span>{dish.emoji}</span></div><div className="detail-copy"><Link href="/menu" className="back-link"><ArrowLeft size={16} /> Back to menu</Link><span className="section-kicker">{dish.category.toUpperCase()}</span><h1>{dish.name}</h1><div className="detail-rating"><Star size={17} fill="currentColor" /> {dish.rating} <span>·</span> <Clock size={16} /> {dish.time}</div><p>{dish.description}</p><p>Prepared fresh with care and inspired by the flavors of Ethiopia. Serve it with your favorite sides for a comforting meal.</p><div className="detail-price">{formatBirr(dish.price)}</div><button className="button button-primary" onClick={() => { addToCart(dish); router.push("/cart"); }}><Plus size={18} /> Add to cart</button></div></section>;
}
