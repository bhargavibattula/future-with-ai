"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface StoreItemCardProps {
  item: {
    name: string;
    description?: string;
    price: number;
    type?: string;
  };
  ownedQuantity: number;
  purchasing: boolean;
  onBuy: () => void;
}

export default function StoreItemCard({ item, ownedQuantity, purchasing, onBuy }: StoreItemCardProps) {
  const isOwned = ownedQuantity > 0 && item.type !== "consumable";

  return (
    <div className="p-4 rounded-2xl border bg-white flex flex-col justify-between">
      <div>
        <div className="text-sm font-bold mb-1">{item.name}</div>
        <div className="text-xs text-[#6B6785] mb-3">{item.description}</div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-sm font-extrabold">{item.price} coins</div>
          {ownedQuantity > 0 && <div className="text-[11px] text-emerald-700">Owned: {ownedQuantity}</div>}
        </div>
        <Button onClick={onBuy} size="sm" disabled={isOwned || purchasing} className="bg-[#8B7FE8] text-white">
          {purchasing ? "Purchasing..." : isOwned ? "Owned" : ownedQuantity > 0 ? "Buy again" : "Buy"}
        </Button>
      </div>
    </div>
  );
}
