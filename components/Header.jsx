"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  UtensilsCrossed,
  ShoppingBag,
  UserRound,
  LogOut,
  Menu as MenuIcon,
  X,
  Heart,
  House,
  Utensils,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { useStore } from "./StoreProvider";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const {
    cartCount,
    favoriteCount,
    user,
    signOut,
  } = useStore();

  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: House },
    { href: "/menu", label: "Menu", icon: Utensils },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/orders", label: "My Orders", icon: ClipboardList },
    ...(user?.role === "kitchen"
      ? [{ href: "/kitchen", label: "Kitchen", icon: UtensilsCrossed }]
      : []),
  ];

  function logout() {
    signOut();
    setMobileOpen(false);
    router.push("/");
  }

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link
          className="brand"
          href="/"
          aria-label="Addis Eats home"
        >
          <span className="brand-mark">
            <UtensilsCrossed size={22} />
          </span>

          <span>
            Addis<span className="brand-accent">Eats</span>
            <small>ETHIOPIAN FOOD, MADE WITH LOVE</small>
          </span>
        </Link>

        <nav className={`nav-links ${mobileOpen ? "nav-open" : ""}`}>
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                className={
                  pathname === link.href
                    ? "nav-link active"
                    : "nav-link"
                }
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Icon size={16} />
                {link.label}

                {link.href === "/favorites" && favoriteCount > 0 && (
                  <span>({favoriteCount})</span>
                )}
              </Link>
            );
          })}

          <Link
            className="nav-mobile-cart"
            href="/cart"
            onClick={() => setMobileOpen(false)}
          >
            <ShoppingBag
              size={17}
              style={{ verticalAlign: "middle", marginRight: "7px" }}
            />
            Cart ({cartCount})
          </Link>
        </nav>

        <div className="nav-actions">
          <Link
            className="cart-button"
            href="/cart"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag size={19} />
            <span>Cart</span>
            <b>{cartCount}</b>
          </Link>

          {user ? (
            <button
              className="account-button"
              onClick={logout}
              title={`Sign out ${user.email}`}
              type="button"
            >
              <LogOut size={18} />
              <span>Sign out</span>
            </button>
          ) : (
            <Link className="account-button" href="/signin">
              <UserRound size={18} />
              <span>Sign in</span>
            </Link>
          )}
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          type="button"
        >
          {mobileOpen ? <X /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );
}