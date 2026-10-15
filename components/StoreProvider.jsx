"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const StoreContext = createContext(null);

const CART_KEY = "addis-eats-upgraded-cart";
const USER_KEY = "addis-eats-upgraded-user";
const ORDERS_KEY = "addis-eats-upgraded-orders";
const FAVORITES_KEY = "addis-eats-upgraded-favorites";

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem(CART_KEY) || "[]"));
      setUser(JSON.parse(localStorage.getItem(USER_KEY) || "null"));
      setOrders(JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"));
      setFavorites(
        JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]")
      );
    } catch {
      setCart([]);
      setUser(null);
      setOrders([]);
      setFavorites([]);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }, [cart, ready]);

  useEffect(() => {
    if (!ready) return;

    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user, ready]);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  }, [orders, ready]);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
      );
    }
  }, [favorites, ready]);

  function addToCart(dish, quantity = 1) {
    setCart((current) => {
      const existing = current.find((item) => item.id === dish.id);

      if (existing) {
        return current.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...current,
        {
          id: dish.id,
          name: dish.name,
          price: dish.price,
          emoji: dish.emoji,
          image: dish.image || "",
          quantity,
        },
      ];
    });
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      setCart((current) =>
        current.filter((item) => item.id !== id)
      );
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  function removeFromCart(id) {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function toggleFavorite(dish) {
    setFavorites((current) => {
      const exists = current.some((item) => item.id === dish.id);

      if (exists) {
        return current.filter((item) => item.id !== dish.id);
      }

      return [...current, { ...dish }];
    });
  }

  function isFavorite(id) {
    return favorites.some((item) => item.id === id);
  }

  function signIn(email, role) {
    const nextUser = {
      email,
      role,
      name:
        role === "kitchen"
          ? "Kitchen Team"
          : "Addis Eats Customer",
    };

    setUser(nextUser);
    return nextUser;
  }

  function signOut() {
    setUser(null);
  }

  function placeOrder(details) {
    const order = {
      id: `AE-${Date.now().toString().slice(-7)}`,
      createdAt: new Date().toISOString(),
      status: "Received",
      customerEmail: user?.email || details.email,
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      details,
    };

    setOrders((current) => [order, ...current]);
    setCart([]);

    return order;
  }

  function updateOrderStatus(id, status) {
    setOrders((current) =>
      current.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  }

  const value = useMemo(
    () => ({
      cart,
      user,
      orders,
      favorites,
      ready,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleFavorite,
      isFavorite,
      signIn,
      signOut,
      placeOrder,
      updateOrderStatus,
      cartCount: cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
      cartTotal: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      favoriteCount: favorites.length,
    }),
    [cart, user, orders, favorites, ready]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }

  return context;
}