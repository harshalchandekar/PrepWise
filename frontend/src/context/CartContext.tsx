import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../lib/api';
import { useAuth } from './AuthContext';

export type CartItem = { item: { _id: string; title: string; price: number; imageUrl?: string }; quantity: number };

type CartContextType = {
  items: CartItem[];
  sessionId: string | null;
  refresh: () => Promise<void>;
  add: (itemId: string, quantity?: number) => Promise<void>;
  update: (itemId: string, quantity: number) => Promise<void>;
  remove: (itemId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(() => localStorage.getItem('sessionId'));

  const commonHeaders = useMemo(() => ({ token: token || undefined, sessionId: sessionId || undefined }), [token, sessionId]);

  const refresh = async () => {
    const data = await apiFetch<{ items: CartItem[]; sessionId?: string }>(`/cart`, commonHeaders);
    setItems(data.items);
    if (data.sessionId) {
      localStorage.setItem('sessionId', data.sessionId);
      setSessionId(data.sessionId);
    }
  };

  const add = async (itemId: string, quantity = 1) => {
    const data = await apiFetch<{ items: CartItem[]; sessionId?: string }>(`/cart/add`, {
      method: 'POST',
      body: { itemId, quantity },
      ...commonHeaders,
    });
    setItems(data.items);
    if (data.sessionId) {
      localStorage.setItem('sessionId', data.sessionId);
      setSessionId(data.sessionId);
    }
  };

  const update = async (itemId: string, quantity: number) => {
    const data = await apiFetch<{ items: CartItem[] }>(`/cart/update`, {
      method: 'POST',
      body: { itemId, quantity },
      ...commonHeaders,
    });
    setItems(data.items);
  };

  const remove = async (itemId: string) => {
    const data = await apiFetch<{ items: CartItem[] }>(`/cart/remove`, {
      method: 'POST',
      body: { itemId },
      ...commonHeaders,
    });
    setItems(data.items);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, sessionId]);

  const value = useMemo(() => ({ items, sessionId, refresh, add, update, remove }), [items, sessionId]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

