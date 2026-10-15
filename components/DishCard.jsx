"use client";

import Link from "next/link";
import { Plus, Star, Clock, Heart } from "lucide-react";
import { useStore } from "./StoreProvider";
import { formatBirr } from "@/lib/dishes";

export default function DishCard({ dish }) {
  const {
    addToCart,
    toggleFavorite,
    isFavorite,
  } = useStore();

  const favorite = isFavorite(dish.id);

  return (
    <article className="dish-card">
      <Link
        href={`/menu/${dish.id}`}
        className="dish-art"
        aria-label={`View ${dish.name}`}
        style={{ position: "relative", overflow: "hidden" }}
      >
        {dish.image && (
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
        )}

        <span className="dish-tag">{dish.tag}</span>

        {!dish.image && (
          <span className="dish-emoji" role="img" aria-label={dish.name}>
            {dish.emoji}
          </span>
        )}

        <span className="dish-art-label">MADE FRESH DAILY</span>
      </Link>

      <div className="dish-info">
        <div className="dish-meta">
          <span>{dish.category}</span>

          <span className="rating">
            <Star size={14} fill="currentColor" />
            {dish.rating}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            marginTop: "7px",
          }}
        >
          <Link
            href={`/menu/${dish.id}`}
            className="dish-name"
            style={{ marginTop: 0 }}
          >
            {dish.name}
          </Link>

          <button
            type="button"
            onClick={() => toggleFavorite(dish)}
            aria-label={
              favorite
                ? `Remove ${dish.name} from favorites`
                : `Add ${dish.name} to favorites`
            }
            aria-pressed={favorite}
            title={favorite ? "Remove favorite" : "Add to favorites"}
            style={{
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              width: "35px",
              height: "35px",
              border: "1px solid #eee6dc",
              borderRadius: "50%",
              background: favorite ? "#fff0ed" : "#ffffff",
              color: favorite ? "#df642f" : "#73786f",
              cursor: "pointer",
            }}
          >
            <Heart
              size={18}
              fill={favorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        <p className="dish-description">{dish.description}</p>

        <div className="dish-bottom">
          <div>
            <strong>{formatBirr(dish.price)}</strong>

            <small>
              <Clock size={13} />
              {dish.time}
            </small>
          </div>

          <button
            className="add-button"
            type="button"
            onClick={() => addToCart(dish)}
            aria-label={`Add ${dish.name} to cart`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}