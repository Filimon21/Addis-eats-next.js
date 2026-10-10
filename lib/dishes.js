export const dishes = [
  {
    id: "doro-wot",
    name: "Doro Wot",
    description:
      "Traditional Ethiopian chicken stew prepared with berbere spices and boiled eggs.",
    price: 450,
    category: "Traditional",
    rating: 4.9,
  },
  {
    id: "tibs",
    name: "Tibs",
    description:
      "Tender sautéed beef prepared with Ethiopian spices, onions, and peppers.",
    price: 380,
    category: "Traditional",
    rating: 4.8,
  },
  {
    id: "kitfo",
    name: "Kitfo",
    description:
      "Traditional Ethiopian minced beef seasoned with mitmita and spiced butter.",
    price: 420,
    category: "Traditional",
    rating: 4.9,
  },
  {
    id: "shiro",
    name: "Shiro",
    description:
      "A comforting chickpea stew seasoned with traditional Ethiopian spices.",
    price: 180,
    category: "Vegetarian",
    rating: 4.7,
  },
  {
    id: "beyaynetu",
    name: "Beyaynetu",
    description:
      "A colorful selection of Ethiopian vegetarian dishes served with injera.",
    price: 250,
    category: "Vegetarian",
    rating: 4.8,
  },
];

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}