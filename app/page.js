import Link from "next/link";
import { ArrowRight, BadgeCheck, Bike, HeartHandshake, Leaf, Star } from "lucide-react";
import DishCard from "@/components/DishCard";
import { dishes } from "@/lib/dishes";

export default function HomePage() {
  const featured = dishes.slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="hero-bg-shape shape-one" /><div className="hero-bg-shape shape-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR TABLE, OUR TRADITION</div>
            <h1>A taste of Ethiopia,<br /><em>delivered with love.</em></h1>
            <p className="hero-text">From the first tear of injera to the last sip of buna, discover the flavors that bring us together.</p>
            <div className="hero-actions"><Link href="/menu" className="button button-primary">Explore the menu <ArrowRight size={18} /></Link><Link href="#our-story" className="button button-secondary">Our story</Link></div>
            <div className="hero-proof"><div className="avatar-stack"><span>👩🏽</span><span>👨🏾</span><span>👩🏾</span></div><div><div className="proof-stars"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><b>4.9/5</b></div><small>Loved by local food lovers</small></div></div>
          </div>
          <div className="hero-visual">
            <div className="hero-food-circle"><span className="hero-food-emoji">🍛</span><span className="food-spark spark-a">✦</span><span className="food-spark spark-b">✦</span></div>
            <div className="floating-note note-top"><span className="note-icon">🌶️</span><span><b>Authentic flavor</b><small>Tradition in every bite</small></span></div>
            <div className="floating-note note-bottom"><span className="note-icon green-note">🌿</span><span><b>Fresh every day</b><small>Locally sourced goodness</small></span></div>
            <div className="hero-circle-caption">ETHIOPIAN<br />SOUL FOOD</div>
          </div>
        </div>
        <div className="hero-bottom-line"><span>በፍቅር የተሰራ</span><span>FRESH · LOCAL · ETHIOPIAN</span></div>
      </section>

      <section className="benefits">
        <div className="container benefit-grid">
          <div className="benefit"><span className="benefit-icon"><Leaf /></span><div><b>Fresh ingredients</b><small>Local produce, daily</small></div></div>
          <div className="benefit"><span className="benefit-icon"><HeartHandshake /></span><div><b>Made with care</b><small>Recipes full of heritage</small></div></div>
          <div className="benefit"><span className="benefit-icon"><Bike /></span><div><b>Easy ordering</b><small>Your favorites, a few clicks away</small></div></div>
          <div className="benefit"><span className="benefit-icon"><BadgeCheck /></span><div><b>Quality first</b><small>Every meal matters</small></div></div>
        </div>
      </section>

      <section className="section container" id="featured">
        <div className="section-heading"><div><span className="section-kicker">FROM OUR KITCHEN</span><h2>Favorites worth <em>sharing.</em></h2><p>Comforting classics and local favorites, freshly prepared for you.</p></div><Link href="/menu" className="text-link">View full menu <ArrowRight size={17} /></Link></div>
        <div className="dish-grid">{featured.map((dish) => <DishCard key={dish.id} dish={dish} />)}</div>
      </section>

      <section className="story-section" id="our-story"><div className="container story-grid"><div className="story-visual"><div className="story-plate">🫓<span>❤️</span></div><div className="story-stamp">ROOTED IN<br />TRADITION</div></div><div className="story-copy"><span className="section-kicker">A LITTLE ABOUT US</span><h2>Food tastes better<br />when it brings us <em>together.</em></h2><p>Addis Eats celebrates the dishes, rituals, and warm hospitality that make Ethiopian food special. We bring familiar favorites and new discoveries to your table, one delicious meal at a time.</p><Link href="/menu" className="button button-primary">Find your favorite <ArrowRight size={18} /></Link></div></div></section>

      <section className="cta-section container"><div><span className="section-kicker">HUNGRY YET?</span><h2>Your next favorite meal<br />is waiting for you.</h2></div><Link href="/menu" className="button button-light">Order something delicious <ArrowRight size={18} /></Link></section>
    </>
  );
}
