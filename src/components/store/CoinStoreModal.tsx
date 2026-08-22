"use client";

import React, { startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StoreItemCard from "./StoreItemCard";
import GiftModal from "./GiftModal";

export interface StoreItem {
  id: string;
  sku: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  type?: string;
}

interface OwnedItem {
  itemId: string;
  quantity: number;
  item: StoreItem & { purchasable?: boolean };
}

interface PurchaseRecord {
  id: string;
  amount: number;
  reason?: string | null;
  createdAt: string;
  item?: StoreItem | null;
}

interface StoreDataResponse {
  items: StoreItem[];
}

interface WalletResponse {
  wallet: { balance: number };
}

interface OwnedItemsResponse {
  items: OwnedItem[];
}

interface PurchaseHistoryResponse {
  purchases: PurchaseRecord[];
  pagination: {
    page: number;
    totalPages: number;
  };
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    throw new Error(data.error || `Request failed: ${response.status}`);
  }

  return data;
}

export default function CoinStoreModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<StoreItem[]>([]);
  const [ownedItems, setOwnedItems] = useState<OwnedItem[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseRecord[]>([]);
  const [historyPagination, setHistoryPagination] = useState({ page: 1, totalPages: 1 });
  const [giftModalOpen, setGiftModalOpen] = useState(false);

  const loadStoreData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [catalog, wallet, owned] = await Promise.all([
        fetchJson<StoreDataResponse>("/api/store/catalog"),
        fetchJson<WalletResponse>("/api/wallet"),
        fetchJson<OwnedItemsResponse>("/api/store/owned"),
      ]);

      setItems(catalog.items);
      setBalance(wallet.wallet.balance);
      setOwnedItems(owned.items);
    } catch (err: unknown) {
      console.warn("Store data fetch failed:", err);
      setItems([]);
      setOwnedItems([]);
      setBalance(null);
      setError(err instanceof Error ? err.message : "Failed to load the store.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    startTransition(() => {
      void loadStoreData();
    });
  }, [isOpen]);

  const loadPurchaseHistory = async () => {
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const data = await fetchJson<PurchaseHistoryResponse>("/api/store/purchases?limit=10");
      setPurchaseHistory(data.purchases);
      setHistoryPagination(data.pagination);
    } catch (err: unknown) {
      setHistoryError(err instanceof Error ? err.message : "Failed to load purchase history.");
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleHistoryToggle = () => {
    const nextOpen = !historyOpen;
    setHistoryOpen(nextOpen);
    if (nextOpen) void loadPurchaseHistory();
  };

  const handlePurchase = async (itemId: string) => {
    setPurchasingId(itemId);
    setError(null);
    setNotice(null);
    try {
      const json = await fetchJson<{ message?: string }>("/api/store/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });

      setNotice(json.message || "Purchase successful.");
      await loadStoreData();
      if (historyOpen) await loadPurchaseHistory();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Purchase failed.");
    } finally {
      setPurchasingId(null);
    }
  };

  const ownedByItemId = new Map(ownedItems.map((ownedItem) => [ownedItem.itemId, ownedItem.quantity]));

  const handleClose = () => {
    setHistoryOpen(false);
    setNotice(null);
    setError(null);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "flex" : "hidden"} items-center justify-center`}> 
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
      <div className="relative w-full max-w-4xl p-6 bg-white rounded-3xl border shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Coin Store</h3>
          <div className="flex items-center gap-2">
            <div className="text-sm font-bold text-[#D97706]">
              {balance === null ? "Balance unavailable" : `${balance.toLocaleString()} coins`}
            </div>
            <Button variant="ghost" size="sm" onClick={handleHistoryToggle}>
              {historyOpen ? "Store" : "Purchase history"}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setGiftModalOpen(true)}>Gift</Button>
            <Button variant="outline" size="sm" onClick={handleClose}>Close</Button>
          </div>
        </div>

        {error && <div className="text-xs text-red-600 mb-3">{error}</div>}
        {notice && <div className="text-xs text-emerald-700 mb-3">{notice}</div>}

        {historyOpen ? (
          <div className="space-y-3">
            {historyLoading ? (
              <div className="text-sm text-[#6B6785]">Loading purchase history...</div>
            ) : historyError ? (
              <div className="space-y-2">
                <div className="text-sm text-red-600">{historyError}</div>
                <Button variant="outline" size="sm" onClick={() => void loadPurchaseHistory()}>Retry</Button>
              </div>
            ) : purchaseHistory.length === 0 ? (
              <div className="text-sm text-[#6B6785]">No purchases yet.</div>
            ) : (
              purchaseHistory.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between gap-4 rounded-2xl border p-3">
                  <div className="min-w-0">
                    <div className="text-sm font-bold truncate">{purchase.item?.name || "Store item"}</div>
                    <div className="text-xs text-[#6B6785]">
                      {new Date(purchase.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm font-extrabold text-[#C0336A]">-{purchase.amount} coins</div>
                </div>
              ))
            )}
            {!historyLoading && !historyError && purchaseHistory.length > 0 && (
              <div className="text-xs text-[#6B6785]">
                Page {historyPagination.page} of {historyPagination.totalPages}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {loading ? (
            <div className="text-sm text-[#6B6785]">Loading store...</div>
          ) : error ? (
            <div className="space-y-2">
              <div className="text-sm text-red-600">Unable to load store items.</div>
              <Button variant="outline" size="sm" onClick={() => void loadStoreData()}>Retry</Button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-sm text-[#6B6785]">No store items are available.</div>
          ) : (
            items.map((it) => (
              <StoreItemCard
                key={it.id}
                item={it}
                ownedQuantity={ownedByItemId.get(it.id) || 0}
                purchasing={purchasingId === it.id}
                onBuy={() => void handlePurchase(it.id)}
                balance={balance}
              />
            ))
          )}
          </div>
        )}

        <GiftModal isOpen={giftModalOpen} onClose={() => setGiftModalOpen(false)} />
      </div>
    </div>
  );
}
