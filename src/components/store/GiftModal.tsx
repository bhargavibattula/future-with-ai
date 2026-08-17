"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function GiftModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    setSending(true);
    try {
      const res = await fetch("/api/store/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, amount }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Gift failed");
      alert(json?.message || "Gift sent");
      onClose();
    } catch (err: any) {
      alert(err.message || "Gift failed. Backend integration required.");
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative p-6 bg-white rounded-2xl border shadow-lg w-full max-w-md">
        <h4 className="font-bold mb-2">Send Coins as Gift</h4>
        <div className="space-y-2">
          <input className="w-full p-2 border rounded" placeholder="Recipient email or id" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          <input type="number" className="w-full p-2 border rounded" placeholder="Amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </div>
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleSend} disabled={sending || !recipient || amount <= 0}>Send</Button>
        </div>
      </div>
    </div>
  );
}
