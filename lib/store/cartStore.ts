import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];

  addItem: (item: CartItem) => void;

  removeItem: (id: number, size: string) => void;

  increaseQuantity: (id: number, size: string) => void;

  decreaseQuantity: (id: number, size: string) => void;

  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.size === item.size
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.size === item.size
                  ? {
                      ...i,
                      quantity: i.quantity + item.quantity,
                    }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, item],
          };
        }),

      removeItem: (id, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        })),

      increaseQuantity: (id, size) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.size === size
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        })),

      decreaseQuantity: (id, size) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id && item.size === size
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "noise-cart",
    }
  )
);