"use client";

import { useEffect, useState } from "react";
import { Wallet, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";

interface Transaction {
  id: string;
  amount: number;
  type: "EARNED" | "SPENT" | "REFUNDED" | "PURCHASED" | "SYSTEM" | "REWARD";
  reason: string;
  createdAt: string;
  balanceAfter: number | null;
}

interface WalletHistoryResponse {
  transactions: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function WalletPage() {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadData = async (pageToLoad: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const [walletRes, historyRes] = await Promise.all([
        fetch("/api/wallet"),
        fetch(`/api/wallet/transactions?page=${pageToLoad}&limit=10`),
      ]);

      const walletData = await walletRes.json();
      const historyData = await historyRes.json();

      if (!walletRes.ok) throw new Error(walletData?.error || "Failed to load wallet balance.");
      if (!historyRes.ok) throw new Error(historyData?.error || "Failed to load transactions.");

      setBalance(walletData.wallet?.balance || 0);
      setTransactions(historyData.transactions || []);
      setTotalPages(historyData.pagination?.totalPages || 1);
      setPage(historyData.pagination?.page || 1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load wallet data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const isCredit = (type: string) => ["EARNED", "REFUNDED", "REWARD"].includes(type);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[#8B7FE8] mb-2">
            <Wallet className="w-5 h-5 fill-current" />
            <span className="text-xs font-black uppercase tracking-wider">Virtual Wallet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)]">My Wallet</h1>
          <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] mt-1.5">Manage your AI Coins and view transaction history.</p>
        </div>
        <button type="button" onClick={() => void loadData(page)} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#EAE6FE] dark:border-white/15 bg-white dark:bg-[#1A1827] px-4 py-2.5 text-xs sm:text-sm font-bold text-[var(--foreground)] hover:bg-[#F3F0FE] dark:hover:bg-[#282142] disabled:opacity-60 min-h-[44px]">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && <div className="mb-5 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-4 text-xs sm:text-sm text-red-700 dark:text-red-400">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="lg:col-span-1 rounded-3xl border border-[#EAE6FE] dark:border-white/10 bg-white dark:bg-[#13111C] p-6 shadow-sm flex flex-col justify-center items-center text-center h-fit">
          <div className="w-16 h-16 rounded-full bg-[#F3F0FE] dark:bg-[#1E1933] flex items-center justify-center mb-4">
            <Wallet className="w-8 h-8 text-[#8B7FE8]" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-[var(--foreground-secondary)]">Current Balance</p>
          <div className="mt-2 text-3xl sm:text-4xl font-black text-[var(--foreground)] flex items-center gap-2">
            <span className="text-amber-500">🪙</span>
            {loading ? "..." : balance.toLocaleString()}
          </div>
        </div>

        {/* Transactions List */}
        <div className="lg:col-span-2 rounded-3xl border border-[#EAE6FE] dark:border-white/10 bg-white dark:bg-[#13111C] p-5 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-5">Transaction History</h2>
          
          {loading ? (
            <div className="py-8 text-center text-xs sm:text-sm text-[var(--foreground-secondary)]">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="py-10 text-center rounded-2xl border border-dashed border-[#D8D2FA] dark:border-white/10 bg-[#FCFBFF] dark:bg-[#181528] p-4">
              <Wallet className="mx-auto w-8 h-8 text-[#8B7FE8] opacity-50 mb-3" />
              <p className="text-sm font-bold text-[var(--foreground)]">No transactions yet</p>
              <p className="text-xs text-[var(--foreground-secondary)] mt-1">Earn coins by completing lessons and streaks!</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {transactions.map((tx) => {
                const credit = isCredit(tx.type) || tx.amount > 0;
                return (
                  <div key={tx.id} className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-[#EAE6FE] dark:border-white/10 hover:bg-[#FCFBFF] dark:hover:bg-[#1A1827] transition-colors">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${credit ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" : "bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400"}`}>
                        {credit ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-[var(--foreground)] truncate">{tx.reason || tx.type}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-[var(--foreground-secondary)]">{new Date(tx.createdAt).toLocaleDateString()}</span>
                          {tx.balanceAfter !== null && (
                            <>
                              <span className="text-[10px] text-[#D8D2FA]">•</span>
                              <span className="text-[11px] font-semibold text-[var(--foreground-secondary)]">Bal: {tx.balanceAfter}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`text-base sm:text-lg font-black shrink-0 ${credit ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                      {credit ? "+" : "-"}{Math.abs(tx.amount)}
                    </div>
                  </div>
                );
              })}
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#EAE6FE] dark:border-white/10">
                  <button 
                    onClick={handlePrevPage} 
                    disabled={page <= 1}
                    className="px-4 py-2 text-xs font-bold rounded-xl border border-[#EAE6FE] dark:border-white/15 hover:bg-[#F3F0FE] dark:hover:bg-[#231E38] disabled:opacity-50 disabled:cursor-not-allowed min-h-[38px]"
                  >
                    Previous
                  </button>
                  <span className="text-xs font-semibold text-[var(--foreground-secondary)]">
                    Page {page} of {totalPages}
                  </span>
                  <button 
                    onClick={handleNextPage} 
                    disabled={page >= totalPages}
                    className="px-4 py-2 text-xs font-bold rounded-xl border border-[#EAE6FE] dark:border-white/15 hover:bg-[#F3F0FE] dark:hover:bg-[#231E38] disabled:opacity-50 disabled:cursor-not-allowed min-h-[38px]"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
