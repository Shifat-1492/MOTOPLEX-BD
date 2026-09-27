export interface ProductVariant {
  id: string;
  name: string;
  size?: string;
  color?: string;
  colorHex?: string;
  material?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  sku: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  userCity: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  brand: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  childCategory?: string;
  productGroup?: string;
  price: number;
  compareAtPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  sku: string;
  stock: number;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  variants: ProductVariant[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  materials: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isPreOrder?: boolean;
}

export interface CategoryGroup {
  id: string;
  name: string;
  slug: string;
}

export interface ChildCategory {
  id: string;
  name: string;
  slug: string;
  productGroups: CategoryGroup[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  childCategories: ChildCategory[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  subcategories: SubCategory[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedMaterial?: string;
}

export interface Coupon {
  code: string;
  type: "percentage" | "flat" | "free_shipping";
  value: number;
  minOrder: number;
  description: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantInfo: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    division: string;
    district: string;
    area: string;
    address: string;
  };
  deliveryMethod: "Standard Courier" | "Express City Delivery";
  paymentMethod: "bKash" | "AamarPay" | "Cash on Delivery";
  trackingNumber?: string;
  courierName?: "Pathao" | "Steadfast" | "RedX";
}

export interface FilterState {
  category?: string;
  subcategory?: string;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  materials: string[];
  inStockOnly: boolean;
  rating?: number;
  searchQuery: string;
  sortBy: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
}
