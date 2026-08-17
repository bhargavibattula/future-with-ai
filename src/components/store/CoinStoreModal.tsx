"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StoreItemCard from "./StoreItemCard";
import GiftModal from "./GiftModal";

export interface StoreItem {
  id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
  type?: string;
}

export default function CoinStoreModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<StoreItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [giftModalOpen, setGiftModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const fetchCatalog = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/store/catalog");
        if (!res.ok) {
          throw new Error(`Catalog fetch failed: ${res.status}`);
        }
        const json = await res.json();
        if (!json || !Array.isArray(json.items)) {
          throw new Error("Catalog response missing items array");
        }
        setItems(json.items);
      } catch (err: any) {
        console.warn("Store catalog fetch failed:", err);
        setError("Store backend not available. Backend integration required.");
        // Fallback: show a small curated sample so UI can be reviewed
        setItems([
          { id: "freeze", title: "Streak Freeze", description: "Protect your streak (500 coins)", price: 500, type: "consumable" },
          { id: "avatar-1", title: "Avatar: Neon Mascot", description: "A colorful profile avatar.", price: 250, type: "avatar" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [isOpen]);

  const handlePurchase = async (itemId: string) => {
    try {
      const res = await fetch("/api/store/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Purchase failed");
      // Success: show toast and close or update state
      alert(json?.message || "Purchase successful");
    } catch (err: any) {
      alert(err.message || "Store purchase failed. Backend integration required.");
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "flex" : "hidden"} items-center justify-center`}> 
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-4xl p-6 bg-white rounded-3xl border shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Coin Store</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setGiftModalOpen(true)}>Gift</Button>
            <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
          </div>
        </div>

        {error && <div className="text-xs text-red-600 mb-3">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            items.map((it) => (
              <StoreItemCard key={it.id} item={it} onBuy={() => handlePurchase(it.id)} />
            ))
          )}
        </div>

        <GiftModal isOpen={giftModalOpen} onClose={() => setGiftModalOpen(false)} />
      </div>
    </div>
  );
}
