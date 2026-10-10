import "server-only";

const orders = [
  {
    id: "order-1001",
    userId: "customer-1",
    items: [
      { dishId: "doro-wot", name: "Doro Wot", quantity: 2, price: 450 },
      { dishId: "shiro", name: "Shiro", quantity: 1, price: 180 },
    ],
    status: "Preparing",
    createdAt: "2026-10-09T10:00:00.000Z",
  },
  {
    id: "order-1002",
    userId: "customer-1",
    items: [{ dishId: "tibs", name: "Tibs", quantity: 1, price: 380 }],
    status: "Confirmed",
    createdAt: "2026-10-09T11:00:00.000Z",
  },
  {
    id: "order-2001",
    userId: "customer-2",
    items: [{ dishId: "kitfo", name: "Kitfo", quantity: 1, price: 420 }],
    status: "Preparing",
    createdAt: "2026-10-09T12:00:00.000Z",
  },
];

export function getOrdersForUser(userId) {
  return orders
    .filter((order) => order.userId === userId)
    .map((order) => structuredClone(order));
}

export function getOrderForUser(orderId, userId) {
  const order = orders.find(
    (item) => item.id === orderId && item.userId === userId,
  );

  return order ? structuredClone(order) : null;
}

export function getAllOrders() {
  return orders.map((order) => structuredClone(order));
}

export function cancelOrderForUser(orderId, userId) {
  const order = orders.find(
    (item) => item.id === orderId && item.userId === userId,
  );

  if (!order) {
    return { success: false, message: "Order not found." };
  }

  if (order.status !== "Confirmed") {
    return {
      success: false,
      message: "Only confirmed orders can be cancelled.",
    };
  }

  order.status = "Cancelled";

  return { success: true, message: "Order cancelled successfully." };
}

export function createOrderForUser(userId, dish) {
  const order = {
    id: `order-${Date.now()}`,
    userId,
    items: [
      {
        dishId: dish.id,
        name: dish.name,
        quantity: 1,
        price: dish.price,
      },
    ],
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  return structuredClone(order);
}

export function updateOrderStatus(orderId, status) {
  const allowedStatuses = [
    "Confirmed",
    "Preparing",
    "Ready",
    "Delivered",
    "Cancelled",
  ];

  if (!allowedStatuses.includes(status)) {
    return false;
  }

  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return false;
  }

  order.status = status;

  return true;
}