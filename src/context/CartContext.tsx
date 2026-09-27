"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Product, ProductVariant, CartItem, Coupon } from "@/types";
import { useToast } from "./ToastContext";

const VALID_COUPONS: Record<string, Coupon> = {
  MOTO10: {
    code: "MOTO10",
    type: "percentage",
    value: 10,
    minOrder: 2000,
    description: "10% Off on your order above ৳2,000",
  },
  FREESHIP: {
    code: "FREESHIP",
    type: "free_shipping",
    value: 0,
    minOrder: 1000,
    description: "Free Courier Delivery Across Bangladesh",
  },
  VIPRIDER: {
    code: "VIPRIDER",
    type: "flat",
    value: 1500,
    minOrder: 15000,
    description: "Flat ৳1,500 Off on orders above ৳15,000",
  },
};

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    size?: string,
    color?: string,
    material?: string,
    variant?: ProductVariant
  ) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  coupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  itemCount: number;
  shippingDestination: "dhaka" | "outside_dhaka";
  setShippingDestination: (dest: "dhaka" | "outside_dhaka") => void;
  freeShippingThreshold: number;
  progressToFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "motoplex_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [shippingDestination, setShippingDestination] = useState<"dhaka" | "outside_dhaka">("dhaka");
  const [isHydrated, setIsHydrated] = useState(false);
  const { showToast } = useToast();

  const freeShippingThreshold = 5000;

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch {
        // ignore
      }
    }
  }, [items, isHydrated]);

  const addToCart = (
    product: Product,
    quantity = 1,
    size?: string,
    color?: string,
    material?: string,
    variant?: ProductVariant
  ) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant?.id === variant?.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prevItems,
        {
          product,
          selectedVariant: variant,
          quantity,
          selectedSize: size || (product.sizes?.[0] ?? undefined),
          selectedColor: color || (product.colors?.[0]?.name ?? undefined),
          selectedMaterial: material || (product.materials?.[0] ?? undefined),
        },
      ];
    });

    showToast("Added to Cart", `${product.name} (x${quantity}) added.`, "success");
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedVariant?.id === variantId)
      )
    );
    showToast("Item Removed", "Product removed from cart.", "info");
  };

  const updateQuantity = (productId: string, variantId: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedVariant?.id === variantId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const cleaned = code.trim().toUpperCase();
    const found = VALID_COUPONS[cleaned];

    if (!found) {
      showToast("Invalid Coupon", "Code not recognized. Try 'MOTO10' or 'FREESHIP'", "error");
      return false;
    }

    if (subtotal < found.minOrder) {
      showToast(
        "Minimum Order Required",
        `Order must be at least ৳${found.minOrder.toLocaleString()} for this code.`,
        "warning"
      );
      return false;
    }

    setCoupon(found);
    showToast("Coupon Applied!", found.description, "success");
    return true;
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast("Coupon Removed", "Promo code was removed.", "info");
  };

  // Computations
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const price = item.selectedVariant?.price ?? item.product.price;
      return acc + price * item.quantity;
    }, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const discount = useMemo(() => {
    if (!coupon) return 0;
    if (subtotal < coupon.minOrder) return 0;

    if (coupon.type === "percentage") {
      return Math.round((subtotal * coupon.value) / 100);
    }
    if (coupon.type === "flat") {
      return Math.min(coupon.value, subtotal);
    }
    return 0;
  }, [coupon, subtotal]);

  const shippingFee = useMemo(() => {
    if (items.length === 0) return 0;
    if (coupon?.type === "free_shipping") return 0;
    if (subtotal >= freeShippingThreshold) return 0;
    return shippingDestination === "dhaka" ? 80 : 150;
  }, [items.length, coupon, subtotal, shippingDestination]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount + shippingFee);
  }, [subtotal, discount, shippingFee]);

  const progressToFreeShipping = useMemo(() => {
    if (subtotal >= freeShippingThreshold) return 100;
    return Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  }, [subtotal]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        coupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        shippingFee,
        total,
        itemCount,
        shippingDestination,
        setShippingDestination,
        freeShippingThreshold,
        progressToFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
