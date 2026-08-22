"use client";

import React, { startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Recipient {
  id: string;
  name: string | null;
  email: string | null;
  image?: string | null;
}

interface GiftItem {
  id: string;
  sku: string;
  name: string;
  description?: string | null;
  type: string;
  price: number;
  giftable?: boolean;
}

interface GiftRecord {
  id: string;
  coinAmount: number | null;
  status: string;
  createdAt: string;
  completedAt?: string | null;
  item: { name: string; price: number; type: string } | null;
  sender: Recipient;
  recipient: Recipient;
}

interface GiftHistoryResponse {
  gifts: GiftRecord[];
  pagination: { page: number; totalPages: number };
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(data.error || `Request failed: ${response.status}`);
  return data;
}

export default function GiftModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [recipientQuery, setRecipientQuery] = useState("");
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [items, setItems] = useState<GiftItem[]>([]);
  const [giftType, setGiftType] = useState<"coins" | "item">("coins");
  const [amount, setAmount] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [historyTab, setHistoryTab] = useState<"sent" | "received">("sent");
  const [history, setHistory] = useState<GiftRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [wallet, catalog] = await Promise.all([
        fetchJson<{ wallet: { balance: number } }>("/api/wallet"),
        fetchJson<{ items: GiftItem[] }>("/api/store/catalog"),
      ]);
      setBalance(wallet.wallet.balance);
      setItems(catalog.items.filter((item) => item.giftable !== false));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load gifting data.");
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async (direction: "sent" | "received") => {
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const data = await fetchJson<GiftHistoryResponse>(`/api/store/gifts?direction=${direction}&limit=20`);
      setHistory(data.gifts);
    } catch (err: unknown) {
      setHistoryError(err instanceof Error ? err.message : "Failed to load gift history.");
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    startTransition(() => {
      void loadInitialData();
      void loadHistory(historyTab);
    });
  }, [isOpen, historyTab]);

  useEffect(() => {
    if (!isOpen || recipientQuery.trim().length < 2 || recipient) {
      return;
    }

    const timer = window.setTimeout(async () => {
      setSearching(true);
      try {
        const data = await fetchJson<{ recipients: Recipient[] }>(
          `/api/store/recipients?q=${encodeURIComponent(recipientQuery.trim())}`,
        );
        setRecipients(data.recipients);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Recipient search failed.");
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [isOpen, recipientQuery, recipient]);

  const selectedItem = items.find((item) => item.id === selectedItemId);
  const coinAmount = Number(amount);
  const giftCost = giftType === "item" ? selectedItem?.price || 0 : coinAmount;
  const canAfford = balance !== null && giftCost > 0 && giftCost <= balance;

  const handleSend = async () => {
    if (!recipient || !canAfford || (giftType === "item" && !selectedItem)) return;
    setSending(true);
    setError(null);
    try {
      const json = await fetchJson<{ message?: string }>("/api/store/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: recipient.id,
          ...(giftType === "item" ? { itemId: selectedItem?.id } : { amount: coinAmount }),
        }),
      });
      setSuccess(json.message || "Gift sent successfully.");
      setConfirming(false);
      await Promise.all([loadInitialData(), loadHistory("sent")]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gift failed.");
    } finally {
      setSending(false);
    }
  };

  const resetAndClose = () => {
    setRecipient(null);
    setRecipientQuery("");
    setAmount("");
    setSelectedItemId("");
    setConfirming(false);
    setSuccess(null);
    setError(null);
    onClose();
  };

  const recipientName = (user: Recipient) => user.name || user.email || "Learner";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={resetAndClose} />
      <div className="relative p-6 bg-white rounded-2xl border shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="font-bold">Peer Gifting</h4>
            <p className="text-xs text-[#6B6785]">
              {balance === null ? "Balance unavailable" : `Your balance: ${balance.toLocaleString()} coins`}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={resetAndClose}>Close</Button>
        </div>

        {loading ? (
          <div className="text-sm text-[#6B6785]">Loading gifting data...</div>
        ) : success ? (
          <div className="space-y-4">
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">{success}</div>
            <Button size="sm" onClick={() => setSuccess(null)}>Send another gift</Button>
          </div>
        ) : (
          <>
            {error && <div className="mb-3 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>}

            {!confirming ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#6B6785]">Recipient</label>
                  {recipient ? (
                    <div className="mt-1 flex items-center justify-between rounded-xl border p-3">
                      <div>
                        <div className="text-sm font-bold">{recipientName(recipient)}</div>
                        <div className="text-xs text-[#6B6785]">{recipient.email}</div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => { setRecipient(null); setRecipientQuery(""); }}>Change</Button>
                    </div>
                  ) : (
                    <>
                      <input
                        className="mt-1 w-full p-2 border rounded"
                        placeholder="Search by name or email"
                        value={recipientQuery}
                        onChange={(event) => { setRecipientQuery(event.target.value); setRecipients([]); setError(null); }}
                      />
                      {searching && <div className="mt-2 text-xs text-[#6B6785]">Searching...</div>}
                      {recipients.length > 0 && (
                        <div className="mt-2 space-y-1 rounded-xl border p-2">
                          {recipients.map((candidate) => (
                            <button key={candidate.id} type="button" className="w-full text-left rounded-lg p-2 hover:bg-[#F3F0FE]" onClick={() => { setRecipient(candidate); setRecipientQuery(recipientName(candidate)); setRecipients([]); }}>
                              <div className="text-sm font-bold">{recipientName(candidate)}</div>
                              <div className="text-xs text-[#6B6785]">{candidate.email}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant={giftType === "coins" ? "default" : "outline"} size="sm" onClick={() => setGiftType("coins")}>Coins</Button>
                  <Button variant={giftType === "item" ? "default" : "outline"} size="sm" onClick={() => setGiftType("item")}>Store item</Button>
                </div>

                {giftType === "coins" ? (
                  <div>
                    <label className="text-xs font-bold text-[#6B6785]">Coin amount</label>
                    <input type="number" min="1" step="1" className="mt-1 w-full p-2 border rounded" placeholder="Amount" value={amount} onChange={(event) => setAmount(event.target.value)} />
                    {amount && !Number.isSafeInteger(coinAmount) && <div className="mt-1 text-xs text-red-600">Enter a positive whole number.</div>}
                    {Number.isSafeInteger(coinAmount) && coinAmount > 0 && balance !== null && coinAmount > balance && <div className="mt-1 text-xs text-red-600">Insufficient balance.</div>}
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-bold text-[#6B6785]">Giftable item</label>
                    <select className="mt-1 w-full p-2 border rounded" value={selectedItemId} onChange={(event) => setSelectedItemId(event.target.value)}>
                      <option value="">Select an item</option>
                      {items.map((item) => <option key={item.id} value={item.id}>{item.name} - {item.price} coins</option>)}
                    </select>
                    {selectedItem && balance !== null && selectedItem.price > balance && <div className="mt-1 text-xs text-red-600">Insufficient balance for this item.</div>}
                  </div>
                )}

                <Button className="w-full" onClick={() => setConfirming(true)} disabled={!recipient || !canAfford || (giftType === "item" && !selectedItem)}>Review gift</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border p-4 text-sm space-y-1">
                  <div><span className="font-bold">Recipient:</span> {recipient ? recipientName(recipient) : "-"}</div>
                  <div><span className="font-bold">Gift:</span> {giftType === "item" ? selectedItem?.name : `${coinAmount} coins`}</div>
                  <div><span className="font-bold">Cost:</span> {giftCost} coins</div>
                  <div><span className="font-bold">Balance after:</span> {(balance ?? 0) - giftCost} coins</div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setConfirming(false)}>Back</Button>
                  <Button size="sm" onClick={() => void handleSend()} disabled={sending}>{sending ? "Sending..." : "Confirm gift"}</Button>
                </div>
              </div>
            )}
          </>
        )}

        <div className="mt-6 border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Button variant={historyTab === "sent" ? "default" : "outline"} size="sm" onClick={() => { setHistoryTab("sent"); void loadHistory("sent"); }}>Sent gifts</Button>
            <Button variant={historyTab === "received" ? "default" : "outline"} size="sm" onClick={() => { setHistoryTab("received"); void loadHistory("received"); }}>Received gifts</Button>
          </div>
          {historyLoading ? (
            <div className="text-xs text-[#6B6785]">Loading gift history...</div>
          ) : historyError ? (
            <div className="text-xs text-red-600">{historyError}</div>
          ) : history.length === 0 ? (
            <div className="text-xs text-[#6B6785]">No {historyTab} gifts yet.</div>
          ) : (
            <div className="space-y-2">
              {history.map((gift) => {
                const otherUser = historyTab === "sent" ? gift.recipient : gift.sender;
                return (
                  <div key={gift.id} className="flex items-center justify-between gap-3 rounded-xl border p-3">
                    <div className="min-w-0">
                      <div className="text-sm font-bold truncate">{historyTab === "sent" ? "To" : "From"} {recipientName(otherUser)}</div>
                      <div className="text-xs text-[#6B6785]">{gift.item?.name || `${gift.coinAmount} coins`} · {new Date(gift.createdAt).toLocaleString()}</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">{gift.status}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
