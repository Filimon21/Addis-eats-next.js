"use client";

import Link from "next/link";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShoppingCart,
} from "lucide-react";
import { useStore } from "@/components/StoreProvider";
import { formatBirr } from "@/lib/dishes";

const DELIVERY_FEE = 50;

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    ready,
  } = useStore();

  if (!ready) {
    return (
      <section className="container page-section">
        <p>Loading your cart...</p>
      </section>
    );
  }

  return (
    <section className="container page-section">
      <div className="page-heading align-left">
        <span className="section-kicker">YOUR ORDER, YOUR WAY</span>
        <h1>Your <em>cart.</em></h1>
        <p>Everything delicious you've picked, all in one place.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <span>
            <ShoppingBag size={38} />
          </span>

          <h2>Your cart is waiting for something delicious.</h2>

          <p>Explore the menu and add a dish you love.</p>

          <Link href="/menu" className="button button-primary">
            Explore menu <ArrowRight size={17} />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div
                  className="cart-item-art"
                  style={{
                    overflow: "hidden",
                    padding: 0,
                    flexShrink: 0,
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span>{item.emoji || "🍽️"}</span>
                  )}
                </div>

                <div className="cart-item-main">
                  <h3>{item.name}</h3>
                  <p>{formatBirr(item.price)} each</p>

                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <Minus size={14} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="cart-item-end">
                  <b>
                    {formatBirr(item.price * item.quantity)}
                  </b>

                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    title="Remove item"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="order-summary">
            <h2>
              <ShoppingCart
                size={19}
                style={{
                  verticalAlign: "middle",
                  marginRight: "8px",
                }}
              />
              Order summary
            </h2>

            <div className="summary-line">
              <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              <b>{formatBirr(cartTotal)}</b>
            </div>

            <div className="summary-line">
              <span>Delivery fee</span>
              <b>{formatBirr(DELIVERY_FEE)}</b>
            </div>

            <div className="summary-line summary-total">
              <span>Total</span>
              <b>{formatBirr(cartTotal + DELIVERY_FEE)}</b>
            </div>

            <p className="summary-note">
              The delivery fee is a demo estimate.
            </p>

            <Link
              href="/checkout"
              className="button button-primary button-full"
            >
              Continue to checkout <ArrowRight size={17} />
            </Link>

            <Link href="/menu" className="continue-link">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}