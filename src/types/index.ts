export interface Product {
  id: string;
  name: string;
  frenchName: string;
  category: 'Skincare' | 'Makeup' | 'Fragrance' | 'All';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  volume: string;
  tagline: string;
  description: string;
  keyIngredients: string[];
  benefits: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  shade?: string;
}

export interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  itemCount: string;
  link: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  frenchTitle: string;
  subtitle: string;
  caption: string;
  category: string;
  image: string;
  aspect: string;
  tag: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  verified: boolean;
  productMention: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  frenchTitle: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorRole: string;
}

export interface OrderPaymentDetails {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  cardExp: string;
  cardCvv: string;
  cardholderName: string;
}
