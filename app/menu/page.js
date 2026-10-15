"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import DishCard from "@/components/DishCard";
import { categories, dishes } from "@/lib/dishes";

export default function MenuPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => dishes.filter((dish) => (category === "All" || dish.category === category) && `${dish.name} ${dish.description} ${dish.category}`.toLowerCase().includes(query.toLowerCase())), [query, category]);
  return (
    <section className="page-section container">
      <div className="page-heading"><span className="section-kicker">MADE FRESH, SERVED WITH LOVE</span><h1>Explore our <em>menu.</em></h1><p>Discover your next favorite, from Ethiopian classics to refreshing drinks.</p></div>
      <div className="menu-toolbar"><label className="search-box"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes..." aria-label="Search dishes" /></label><span className="result-count"><SlidersHorizontal size={16} /> {filtered.length} dishes</span></div>
      <div className="category-pills">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? "category-pill selected" : "category-pill"}>{item}</button>)}</div>
      {filtered.length ? <div className="dish-grid">{filtered.map((dish) => <DishCard key={dish.id} dish={dish} />)}</div> : <div className="empty-state"><span>🔎</span><h2>No dishes found</h2><p>Try another search or category.</p><button className="button button-primary" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>}
    </section>
  );
}
