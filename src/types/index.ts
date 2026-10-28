export type DishCategory = 'plats' | 'jus' | 'accompagnements';

export interface MenuItem {
  id: string;
  name: string;
  category: DishCategory;
  region: string;
  price: number; // in FCFA (XAF)
  description: string;
  image: string;
  popular?: boolean;
  spicyLevel?: 1 | 2 | 3;
  volume?: string; // for drinks e.g. "500 ml"
  ingredients: string[];
  cookingTime?: string;
  heritageStory?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface DeliveryQuartier {
  id: string;
  name: string;
  fee: number; // in FCFA
  estimatedTime: string;
}

export type PaymentMethod = 'orange_money' | 'momo' | 'cash';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryQuartier: string;
  deliveryAddress: string;
  deliveryInstructions?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'completed' | 'cash_on_delivery';
  createdAt: string;
  estimatedDeliveryMinutes: number;
}
