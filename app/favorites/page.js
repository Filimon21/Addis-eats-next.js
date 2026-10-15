"use client";

import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/components/StoreProvider";
import { formatBirr } from "@/lib/dishes";

export default function FavoritesPage() {
  const {
    favorites,
    toggleFavorite,
    addToCart,
    ready,
  } = useStore();

  if (!ready) {
    return (
      <section className="container page-section">
        <p>Loading your favorites...</p>
      </section>
    );
  }

  return (
    <section className="container page-section">
      <div className="page-heading align-left">
        <span className="section-kicker">YOUR PERSONAL COLLECTION</span>
        <h1>Your <em>favorites.</em></h1>
        <p>Keep your favorite Ethiopian dishes close at hand.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <span>
            <Heart size={38} />
          </span>

          <h2>No favorites yet</h2>

          <p>
            Browse the menu and tap the heart on a dish you love.
          </p>

          <Link href="/menu" className="button button-primary">
            Explore menu <ArrowRight size={17} />
          </Link>
        </div>
      ) : (
        <div className="dish-grid">
          {favorites.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <Link
                href={`/menu/${dish.id}`}
                className="dish-art"
                style={{ position: "relative", overflow: "hidden" }}
              >
                {dish.image ? (
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span className="dish-emoji">{dish.emoji}</span>
                )}

                <span className="dish-tag">YOUR FAVORITE</span>
              </Link>

              <div className="dish-info">
                <h2 className="dish-name">{dish.name}</h2>

                <p className="dish-description">
                  {dish.description}
                </p>

                <div className="dish-bottom">
                  <strong>{formatBirr(dish.price)}</strong>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      className="add-button"
                      type="button"
                      onClick={() => addToCart(dish)}
                      aria-label={`Add ${dish.name} to cart`}
                      title="Add to cart"
                    >
                      <ShoppingBag size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(dish)}
                      aria-label={`Remove ${dish.name} from favorites`}
                      title="Remove favorite"
                      style={{
                        display: "grid",
                        placeItems: "center",
                        width: "37px",
                        height: "37px",
                        border: "1px solid #eee6dc",
                        borderRadius: "11px",
                        background: "#fff0ed",
                        color: "#df642f",
                        cursor: "pointer",
                      }}
                    >
                      <Heart size={18} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}