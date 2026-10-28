import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Order } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Supabase initialization fallback to local storage:', err);
  }
}

export const isSupabaseConfigured = (): boolean => {
  return !!supabase;
};

const LOCAL_STORAGE_KEY = 'territoires_gourmands_commandes';

export async function saveOrder(order: Order): Promise<{ success: boolean; id: string; source: 'supabase' | 'local' }> {
  // Always persist locally for offline resilience and immediate feedback
  try {
    const existingRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const existing: Order[] = existingRaw ? JSON.parse(existingRaw) : [];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([order, ...existing]));
  } catch (e) {
    console.error('Error saving order to localStorage:', e);
  }

  // Attempt to save to Supabase if configured
  if (supabase) {
    try {
      const { data, error } = await supabase.from('commandes').insert([
        {
          id: order.id,
          order_number: order.orderNumber,
          customer_name: order.customerName,
          customer_phone: order.customerPhone,
          customer_email: order.customerEmail || null,
          delivery_quartier: order.deliveryQuartier,
          delivery_address: order.deliveryAddress,
          delivery_instructions: order.deliveryInstructions || null,
          items: order.items,
          subtotal: order.subtotal,
          delivery_fee: order.deliveryFee,
          total: order.total,
          payment_method: order.paymentMethod,
          payment_status: order.paymentStatus,
          created_at: order.createdAt
        }
      ]).select();

      if (error) {
        console.warn('Supabase insert warning, order kept in local storage:', error.message);
        return { success: true, id: order.id, source: 'local' };
      }

      return { success: true, id: (data?.[0]?.id as string) || order.id, source: 'supabase' };
    } catch (err) {
      console.warn('Supabase network error, fallback to local:', err);
      return { success: true, id: order.id, source: 'local' };
    }
  }

  return { success: true, id: order.id, source: 'local' };
}

export function getSavedOrders(): Order[] {
  try {
    const existingRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch {
    return [];
  }
}
