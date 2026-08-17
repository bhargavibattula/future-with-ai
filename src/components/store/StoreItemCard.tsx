"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function StoreItemCard({ item, onBuy }: { item: any; onBuy: () => void }) {
  return (
    <div className="p-4 rounded-2xl border bg-white flex flex-col justify-between">
      <div>
        <div className="text-sm font-bold mb-1">{item.title}</div>
        <div className="text-xs text-[#6B6785] mb-3">{item.description}</div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-extrabold">{item.price} coins</div>
        <Button onClick={onBuy} size="sm" className="bg-[#8B7FE8] text-white">Buy</Button>
      </div>
    </div>
  );
}
