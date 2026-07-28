"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Plus,
  FolderPlus,
  Search,
  BookOpen,
  Layers,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  X,
  FileText,
  Clock,
  RefreshCw,
  Crown,
  Zap,
  Edit3,
  Trash2,
  AlertTriangle,
  FolderOpen,
  SearchX,
} from "lucide-react";

export interface PromptCategoryData {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    prompts: number;
  };
}

export interface PromptData {
  id: string;
  title: string;
  content: string;
  type: "FREE" | "PREMIUM" | "ONE_TIME_PREMIUM";
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function AdminPromptLibrarySection() {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "categories" | "prompts">("overview");

  // Data states
  const [categories, setCategories] = useState<PromptCategoryData[]>([]);
  const [prompts, setPrompts] = useState<PromptData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Create Modal visibility states
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [showPromptModal, setShowPromptModal] = useState<boolean>(false);

  // Category Form state (Create)
  const [catName, setCatName] = useState<string>("");
  const [catDesc, setCatDesc] = useState<string>("");
  const [catSubmitting, setCatSubmitting] = useState<boolean>(false);
  const [catFormError, setCatFormError] = useState<string | null>(null);
  const [catFormSuccess, setCatFormSuccess] = useState<string | null>(null);

  // Category Edit state
  const [editingCategory, setEditingCategory] = useState<PromptCategoryData | null>(null);
  const [editCatName, setEditCatName] = useState<string>("");
  const [editCatDesc, setEditCatDesc] = useState<string>("");
  const [editCatSubmitting, setEditCatSubmitting] = useState<boolean>(false);
  const [editCatFormError, setEditCatFormError] = useState<string | null>(null);
  const [editCatFormSuccess, setEditCatFormSuccess] = useState<string | null>(null);

  // Category Delete state
  const [deletingCategory, setDeletingCategory] = useState<PromptCategoryData | null>(null);
  const [deleteCatSubmitting, setDeleteCatSubmitting] = useState<boolean>(false);
  const [deleteCatError, setDeleteCatError] = useState<string | null>(null);

  // Prompt Form state (Create)
  const [promptTitle, setPromptTitle] = useState<string>("");
  const [promptCategoryId, setPromptCategoryId] = useState<string>("");
  const [promptType, setPromptType] = useState<"FREE" | "PREMIUM" | "ONE_TIME_PREMIUM">("FREE");
  const [promptContent, setPromptContent] = useState<string>("");
  const [promptSubmitting, setPromptSubmitting] = useState<boolean>(false);
  const [promptFormError, setPromptFormError] = useState<string | null>(null);
  const [promptFormSuccess, setPromptFormSuccess] = useState<string | null>(null);

  // Prompt Edit state
  const [editingPrompt, setEditingPrompt] = useState<PromptData | null>(null);
  const [editPromptTitle, setEditPromptTitle] = useState<string>("");
  const [editPromptCategoryId, setEditPromptCategoryId] = useState<string>("");
  const [editPromptType, setEditPromptType] = useState<"FREE" | "PREMIUM" | "ONE_TIME_PREMIUM">("FREE");
  const [editPromptContent, setEditPromptContent] = useState<string>("");
  const [editPromptSubmitting, setEditPromptSubmitting] = useState<boolean>(false);
  const [editPromptFormError, setEditPromptFormError] = useState<string | null>(null);
  const [editPromptFormSuccess, setEditPromptFormSuccess] = useState<string | null>(null);

  // Prompt Delete state
  const [deletingPrompt, setDeletingPrompt] = useState<PromptData | null>(null);
  const [deletePromptSubmitting, setDeletePromptSubmitting] = useState<boolean>(false);
  const [deletePromptError, setDeletePromptError] = useState<string | null>(null);

  // Search filter query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch categories and prompts from API
  const fetchData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const [catRes, promptRes] = await Promise.all([
        fetch("/api/admin/prompt-categories"),
        fetch("/api/admin/prompts"),
      ]);

      const catData = await catRes.json();
      const promptData = await promptRes.json();

      if (catData.success) {
        setCategories(catData.categories || []);
      } else {
        setErrorMsg(catData.error || "Failed to load categories");
      }

      if (promptData.success) {
        setPrompts(promptData.prompts || []);
      } else {
        setErrorMsg(promptData.error || "Failed to load prompts");
      }
    } catch (err: any) {
      console.error("Error fetching Prompt Library data:", err);
      setErrorMsg("Network error loading Prompt Library data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Add Category Submission
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setCatFormError(null);
    setCatFormSuccess(null);

    const trimmedName = catName.trim();
    if (!trimmedName) {
      setCatFormError("Category name is required.");
      return;
    }

    setCatSubmitting(true);
    try {
      const res = await fetch("/api/admin/prompt-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          description: catDesc.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setCatFormError(data.error || "Failed to create category.");
        return;
      }

      setCatFormSuccess("Category created successfully!");
      setCatName("");
      setCatDesc("");
      setTimeout(() => {
        setShowCategoryModal(false);
        setCatFormSuccess(null);
      }, 1000);

      fetchData();
    } catch (err: any) {
      setCatFormError("Server connection error creating category.");
    } finally {
      setCatSubmitting(false);
    }
  };

  // Open Category Edit Modal
  const handleOpenEditCategory = (cat: PromptCategoryData) => {
    setEditingCategory(cat);
    setEditCatName(cat.name);
    setEditCatDesc(cat.description || "");
    setEditCatFormError(null);
    setEditCatFormSuccess(null);
  };

  // Handle Update Category Submission
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setEditCatFormError(null);
    setEditCatFormSuccess(null);

    const trimmedName = editCatName.trim();
    if (!trimmedName) {
      setEditCatFormError("Category name is required.");
      return;
    }

    setEditCatSubmitting(true);
    try {
      const res = await fetch(`/api/admin/prompt-categories/${editingCategory.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          description: editCatDesc.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setEditCatFormError(data.error || "Failed to update category.");
        return;
      }

      setEditCatFormSuccess("Category updated successfully!");
      setTimeout(() => {
        setEditingCategory(null);
        setEditCatFormSuccess(null);
      }, 1000);

      fetchData();
    } catch (err: any) {
      setEditCatFormError("Server connection error updating category.");
    } finally {
      setEditCatSubmitting(false);
    }
  };

  // Handle Delete Category
  const handleConfirmDeleteCategory = async () => {
    if (!deletingCategory) return;
    setDeleteCatError(null);
    setDeleteCatSubmitting(true);

    try {
      const res = await fetch(`/api/admin/prompt-categories/${deletingCategory.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setDeleteCatError(data.error || "Cannot delete category.");
        return;
      }

      setDeletingCategory(null);
      fetchData();
    } catch (err: any) {
      setDeleteCatError("Server connection error deleting category.");
    } finally {
      setDeleteCatSubmitting(false);
    }
  };

  // Handle Add Prompt Submission
  const handleCreatePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setPromptFormError(null);
    setPromptFormSuccess(null);

    const trimmedTitle = promptTitle.trim();
    const trimmedCatId = promptCategoryId.trim();
    const trimmedContent = promptContent.trim();

    if (!trimmedTitle) {
      setPromptFormError("Prompt title is required.");
      return;
    }
    if (!trimmedCatId) {
      setPromptFormError("Please select a category.");
      return;
    }
    if (!trimmedContent) {
      setPromptFormError("Prompt content is required.");
      return;
    }

    setPromptSubmitting(true);
    try {
      const res = await fetch("/api/admin/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: trimmedTitle,
          categoryId: trimmedCatId,
          type: promptType,
          content: trimmedContent,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setPromptFormError(data.error || "Failed to create prompt.");
        return;
      }

      setPromptFormSuccess("Prompt created successfully!");
      setPromptTitle("");
      setPromptCategoryId("");
      setPromptType("FREE");
      setPromptContent("");
      setTimeout(() => {
        setShowPromptModal(false);
        setPromptFormSuccess(null);
      }, 1000);

      fetchData();
    } catch (err: any) {
      setPromptFormError("Server connection error creating prompt.");
    } finally {
      setPromptSubmitting(false);
    }
  };

  // Open Prompt Edit Modal
  const handleOpenEditPrompt = (prompt: PromptData) => {
    setEditingPrompt(prompt);
    setEditPromptTitle(prompt.title);
    setEditPromptCategoryId(prompt.categoryId);
    setEditPromptType(prompt.type);
    setEditPromptContent(prompt.content);
    setEditPromptFormError(null);
    setEditPromptFormSuccess(null);
  };

  // Handle Update Prompt Submission
  const handleUpdatePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPrompt) return;
    setEditPromptFormError(null);
    setEditPromptFormSuccess(null);

    const trimmedTitle = editPromptTitle.trim();
    const trimmedCatId = editPromptCategoryId.trim();
    const trimmedContent = editPromptContent.trim();

    if (!trimmedTitle) {
      setEditPromptFormError("Prompt title is required.");
      return;
    }
    if (!trimmedCatId) {
      setEditPromptFormError("Please select a category.");
      return;
    }
    if (!trimmedContent) {
      setEditPromptFormError("Prompt content is required.");
      return;
    }

    setEditPromptSubmitting(true);
    try {
      const res = await fetch(`/api/admin/prompts/${editingPrompt.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: trimmedTitle,
          categoryId: trimmedCatId,
          type: editPromptType,
          content: trimmedContent,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setEditPromptFormError(data.error || "Failed to update prompt.");
        return;
      }

      setEditPromptFormSuccess("Prompt updated successfully!");
      setTimeout(() => {
        setEditingPrompt(null);
        setEditPromptFormSuccess(null);
      }, 1000);

      fetchData();
    } catch (err: any) {
      setEditPromptFormError("Server connection error updating prompt.");
    } finally {
      setEditPromptSubmitting(false);
    }
  };

  // Handle Delete Prompt
  const handleConfirmDeletePrompt = async () => {
    if (!deletingPrompt) return;
    setDeletePromptError(null);
    setDeletePromptSubmitting(true);

    try {
      const res = await fetch(`/api/admin/prompts/${deletingPrompt.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setDeletePromptError(data.error || "Failed to delete prompt.");
        return;
      }

      setDeletingPrompt(null);
      fetchData();
    } catch (err: any) {
      setDeletePromptError("Server connection error deleting prompt.");
    } finally {
      setDeletePromptSubmitting(false);
    }
  };

  // Trimmed search query
  const cleanSearchQuery = searchQuery.trim().toLowerCase();

  // Filtered prompts
  const filteredPrompts = prompts.filter(
    (p) =>
      !cleanSearchQuery ||
      p.title.toLowerCase().includes(cleanSearchQuery) ||
      p.category?.name.toLowerCase().includes(cleanSearchQuery) ||
      p.type.toLowerCase().includes(cleanSearchQuery) ||
      p.content.toLowerCase().includes(cleanSearchQuery)
  );

  // Filtered categories
  const filteredCategories = categories.filter(
    (c) =>
      !cleanSearchQuery ||
      c.name.toLowerCase().includes(cleanSearchQuery) ||
      (c.description && c.description.toLowerCase().includes(cleanSearchQuery))
  );

  // Analytics counts (TASK 11)
  const totalCategoriesCount = categories.length;
  const totalPromptsCount = prompts.length;
  const freePromptsCount = prompts.filter((p) => p.type === "FREE").length;
  const premiumPromptsCount = prompts.filter((p) => p.type === "PREMIUM").length;
  const oneTimePromptsCount = prompts.filter((p) => p.type === "ONE_TIME_PREMIUM").length;

  const renderTypeBadge = (type: string) => {
    switch (type) {
      case "PREMIUM":
        return (
          <span className="bg-[#F5F2FF] text-[#8B7FE8] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#E8E3FF] inline-flex items-center gap-1">
            <Crown className="w-3 h-3" /> PREMIUM
          </span>
        );
      case "ONE_TIME_PREMIUM":
        return (
          <span className="bg-[#FFF0F5] text-[#C0336A] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#FFC9DE] inline-flex items-center gap-1">
            <Zap className="w-3 h-3" /> ONE TIME
          </span>
        );
      default:
        return (
          <span className="bg-[#E6F9F0] text-[#0E8566] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#B7F2DA]">
            FREE
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 select-none font-sans">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight flex items-center gap-2.5">
            <Terminal className="w-7 h-7 text-[#8B7FE8]" />
            <span>Prompt <span className="text-[#8B7FE8]">Library Manager</span></span>
          </h2>
          <p className="text-xs text-[#6B6785] font-medium mt-1">
            Manage prompt categories, engineer reusable system prompts, and configure access tiers (Free, Premium, One-Time).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchData}
            className="p-2.5 rounded-2xl bg-white border border-[#E8E3FF] text-[#8B7FE8] hover:bg-[#F5F2FF] transition-all cursor-pointer shadow-soft-sm"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={() => setShowCategoryModal(true)}
            className="px-4 py-2.5 rounded-2xl text-xs font-extrabold text-[#8B7FE8] bg-[#F5F2FF] border border-[#E8E3FF] hover:bg-[#8B7FE8] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-soft-sm"
          >
            <FolderPlus className="w-4 h-4" />
            <span>Add Category</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (categories.length === 0) {
                alert("Please create at least one Prompt Category first.");
                setShowCategoryModal(true);
                return;
              }
              setShowPromptModal(true);
            }}
            className="px-4 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Prompt</span>
          </button>
        </div>
      </div>

      {/* TASK 11: 5 ADMIN ANALYTICS SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Total Categories */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3FF] shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#6B6785] block">Total Categories</span>
            <span className="text-xl font-extrabold text-[#1E1B2E] mt-1 block">
              {loading ? "..." : totalCategoriesCount}
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#F5F2FF] border border-[#E8E3FF] flex items-center justify-center text-[#8B7FE8] shrink-0">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        {/* Total Prompts */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3FF] shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#6B6785] block">Total Prompts</span>
            <span className="text-xl font-extrabold text-[#8B7FE8] mt-1 block">
              {loading ? "..." : totalPromptsCount}
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#EBF8FF] border border-[#BEE3F8] flex items-center justify-center text-[#2B6CB0] shrink-0">
            <Terminal className="w-5 h-5" />
          </div>
        </div>

        {/* FREE Prompts */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3FF] shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#6B6785] block">FREE Prompts</span>
            <span className="text-xl font-extrabold text-[#0E8566] mt-1 block">
              {loading ? "..." : freePromptsCount}
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#E6F9F0] border border-[#B7F2DA] flex items-center justify-center text-[#0E8566] shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        {/* PREMIUM Prompts */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3FF] shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#6B6785] block">PREMIUM</span>
            <span className="text-xl font-extrabold text-[#8B7FE8] mt-1 block">
              {loading ? "..." : premiumPromptsCount}
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#F5F2FF] border border-[#E8E3FF] flex items-center justify-center text-[#8B7FE8] shrink-0">
            <Crown className="w-5 h-5" />
          </div>
        </div>

        {/* ONE_TIME_PREMIUM Prompts */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3FF] shadow-soft flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <span className="text-[11px] font-bold text-[#6B6785] block">ONE-TIME</span>
            <span className="text-xl font-extrabold text-[#C0336A] mt-1 block">
              {loading ? "..." : oneTimePromptsCount}
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#FFF0F5] border border-[#FFC9DE] flex items-center justify-center text-[#C0336A] shrink-0">
            <Zap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION & SEARCH BAR */}
      <div className="bg-white rounded-3xl p-4 border border-[#E8E3FF] shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tab pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveSubTab("overview")}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === "overview"
                ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                : "bg-[#F5F2FF] text-[#6B6785] hover:text-[#1E1B2E]"
            }`}
          >
            Overview & Categories Summary
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("categories")}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === "categories"
                ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                : "bg-[#F5F2FF] text-[#6B6785] hover:text-[#1E1B2E]"
            }`}
          >
            Categories Table ({categories.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("prompts")}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === "prompts"
                ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                : "bg-[#F5F2FF] text-[#6B6785] hover:text-[#1E1B2E]"
            }`}
          >
            Prompts Table ({prompts.length})
          </button>
        </div>

        {/* TASK 12: Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7FE8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories, prompts, or type..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
          />
        </div>
      </div>

      {/* ERROR BANNER IF ANY */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* TASK 14: LOADING SKELETONS FOR ADMIN */}
      {loading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-5 border border-[#E8E3FF] shadow-soft space-y-3 animate-pulse">
                <div className="h-4 bg-[#F5F2FF] rounded-full w-2/3" />
                <div className="h-3 bg-[#F5F2FF] rounded-full w-full" />
                <div className="h-3 bg-[#F5F2FF] rounded-full w-4/5" />
                <div className="h-8 bg-[#F5F2FF] rounded-2xl w-full mt-4" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* VIEW 1: OVERVIEW & CATEGORY CARDS */}
          {activeSubTab === "overview" && (
            <div className="space-y-6">
              <h3 className="text-base font-extrabold text-[#1E1B2E] tracking-tight">
                Categories Overview
              </h3>

              {/* TASK 13: POLISHED EMPTY STATES */}
              {categories.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 border border-[#E8E3FF] text-center shadow-soft">
                  <FolderOpen className="w-12 h-12 text-[#8B7FE8]/50 mx-auto mb-3" />
                  <p className="text-sm font-extrabold text-[#1E1B2E]">No Prompt Categories Found</p>
                  <p className="text-xs text-[#6B6785] mt-1 max-w-md mx-auto">
                    Create your first category (e.g. "Coding", "Marketing", "Data Analysis") to start organizing AI prompts.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(true)}
                    className="mt-4 px-5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-soft-sm"
                  >
                    <FolderPlus className="w-4 h-4" />
                    <span>Create First Category</span>
                  </button>
                </div>
              ) : filteredCategories.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 border border-[#E8E3FF] text-center shadow-soft">
                  <SearchX className="w-12 h-12 text-[#8B7FE8]/50 mx-auto mb-3" />
                  <p className="text-sm font-extrabold text-[#1E1B2E]">No Matching Categories</p>
                  <p className="text-xs text-[#6B6785] mt-1">
                    No categories matched your search query "{searchQuery.trim()}".
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-3 px-4 py-2 rounded-xl text-xs font-extrabold text-[#8B7FE8] bg-[#F5F2FF] border border-[#E8E3FF] hover:bg-[#8B7FE8] hover:text-white transition-all cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCategories.map((cat) => {
                    const count = cat._count?.prompts ?? 0;
                    return (
                      <div
                        key={cat.id}
                        className="bg-white rounded-3xl p-5 border border-[#E8E3FF] shadow-soft hover:shadow-soft-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-extrabold text-[#1E1B2E] truncate">
                              {cat.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] font-extrabold text-[#8B7FE8] bg-[#F5F2FF] px-2.5 py-1 rounded-full border border-[#E8E3FF]">
                                {count} {count === 1 ? "prompt" : "prompts"}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-[#6B6785] line-clamp-2 min-h-[32px]">
                            {cat.description || "No description provided."}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#F5F2FF] flex items-center justify-between text-[11px] font-bold text-[#6B6785]">
                          <span className="flex items-center gap-1 text-[10px]">
                            <Clock className="w-3 h-3 text-[#8B7FE8]" />
                            {new Date(cat.createdAt).toLocaleDateString()}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditCategory(cat)}
                              className="p-1.5 rounded-lg bg-[#F5F2FF] text-[#8B7FE8] hover:bg-[#8B7FE8] hover:text-white transition-all cursor-pointer"
                              title="Edit Category"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setDeletingCategory(cat);
                                setDeleteCatError(null);
                              }}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                              title="Delete Category"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: CATEGORIES TABLE */}
          {activeSubTab === "categories" && (
            <div className="bg-white rounded-3xl border border-[#E8E3FF] shadow-soft overflow-hidden">
              <div className="p-5 border-b border-[#F5F2FF] flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#1E1B2E]">Prompt Categories</h3>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(true)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#8B7FE8] bg-[#F5F2FF] border border-[#E8E3FF] hover:bg-[#8B7FE8] hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Category</span>
                </button>
              </div>

              {filteredCategories.length === 0 ? (
                <div className="p-10 text-center shadow-soft">
                  <SearchX className="w-10 h-10 text-[#8B7FE8]/50 mx-auto mb-2" />
                  <p className="text-xs font-extrabold text-[#1E1B2E]">No Categories Found</p>
                  <p className="text-[11px] text-[#6B6785] mt-0.5">Try refining your search keyword.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-semibold">
                    <thead className="bg-[#FCFBFF] border-b border-[#E8E3FF] text-[#6B6785] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-5">Category Name</th>
                        <th className="py-3 px-5">Description</th>
                        <th className="py-3 px-5 text-center">Prompts Count</th>
                        <th className="py-3 px-5">Created At</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5F2FF] text-[#1E1B2E]">
                      {filteredCategories.map((cat) => (
                        <tr key={cat.id} className="hover:bg-[#FCFBFF] transition-colors">
                          <td className="py-3.5 px-5 font-extrabold text-[#1E1B2E]">
                            {cat.name}
                          </td>
                          <td className="py-3.5 px-5 text-[#6B6785] max-w-xs truncate">
                            {cat.description || "—"}
                          </td>
                          <td className="py-3.5 px-5 text-center">
                            <span className="bg-[#F5F2FF] text-[#8B7FE8] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#E8E3FF]">
                              {cat._count?.prompts ?? 0}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-[#6B6785]">
                            {new Date(cat.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEditCategory(cat)}
                                className="p-1.5 rounded-lg bg-[#F5F2FF] text-[#8B7FE8] hover:bg-[#8B7FE8] hover:text-white transition-all cursor-pointer"
                                title="Edit Category"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setDeletingCategory(cat);
                                  setDeleteCatError(null);
                                }}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                                title="Delete Category"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: PROMPTS TABLE */}
          {activeSubTab === "prompts" && (
            <div className="bg-white rounded-3xl border border-[#E8E3FF] shadow-soft overflow-hidden">
              <div className="p-5 border-b border-[#F5F2FF] flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#1E1B2E]">Prompt Templates</h3>
                <button
                  type="button"
                  onClick={() => {
                    if (categories.length === 0) {
                      alert("Please create at least one Prompt Category first.");
                      setShowCategoryModal(true);
                      return;
                    }
                    setShowPromptModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#8B7FE8] hover:bg-[#786BD6] transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Prompt</span>
                </button>
              </div>

              {filteredPrompts.length === 0 ? (
                <div className="p-10 text-center shadow-soft">
                  <SearchX className="w-10 h-10 text-[#8B7FE8]/50 mx-auto mb-2" />
                  <p className="text-xs font-extrabold text-[#1E1B2E]">No Prompts Found</p>
                  <p className="text-[11px] text-[#6B6785] mt-0.5">Try refining your search keyword or create a new prompt.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-semibold">
                    <thead className="bg-[#FCFBFF] border-b border-[#E8E3FF] text-[#6B6785] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-5">Prompt Title</th>
                        <th className="py-3 px-5">Category</th>
                        <th className="py-3 px-5">Type Tier</th>
                        <th className="py-3 px-5">Prompt Content Preview</th>
                        <th className="py-3 px-5">Created At</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5F2FF] text-[#1E1B2E]">
                      {filteredPrompts.map((prompt) => (
                        <tr key={prompt.id} className="hover:bg-[#FCFBFF] transition-colors">
                          <td className="py-3.5 px-5 font-extrabold text-[#1E1B2E] max-w-xs truncate">
                            {prompt.title}
                          </td>
                          <td className="py-3.5 px-5">
                            <span className="bg-[#EBF8FF] text-[#2B6CB0] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#BEE3F8]">
                              {prompt.category?.name || "Uncategorized"}
                            </span>
                          </td>
                          <td className="py-3.5 px-5">
                            {renderTypeBadge(prompt.type)}
                          </td>
                          <td className="py-3.5 px-5 text-[#6B6785] max-w-md font-mono text-[11px] truncate">
                            {prompt.content}
                          </td>
                          <td className="py-3.5 px-5 text-[#6B6785]">
                            {new Date(prompt.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEditPrompt(prompt)}
                                className="p-1.5 rounded-lg bg-[#F5F2FF] text-[#8B7FE8] hover:bg-[#8B7FE8] hover:text-white transition-all cursor-pointer"
                                title="Edit Prompt"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setDeletingPrompt(prompt);
                                  setDeletePromptError(null);
                                }}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                                title="Delete Prompt"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* CREATE CATEGORY MODAL */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B2E]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#E8E3FF] shadow-soft-lg w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => {
                setShowCategoryModal(false);
                setCatFormError(null);
                setCatFormSuccess(null);
              }}
              className="absolute top-4 right-4 p-2 text-[#6B6785] hover:text-[#1E1B2E] hover:bg-[#F5F2FF] rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#F5F2FF] border border-[#E8E3FF] flex items-center justify-center text-[#8B7FE8]">
                <FolderPlus className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-extrabold text-[#1E1B2E]">Add Prompt Category</h3>
            </div>

            {catFormError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{catFormError}</span>
              </div>
            )}

            {catFormSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{catFormSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1E1B2E] mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Frontend Engineering"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1E1B2E] mb-1">
                  Description <span className="text-[#6B6785] font-normal">(Optional)</span>
                </label>
                <textarea
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="Short summary of this prompt category..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#6B6785] hover:bg-[#F5F2FF] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={catSubmitting}
                  className="px-5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {catSubmitting ? "Creating..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B2E]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#E8E3FF] shadow-soft-lg w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => {
                setEditingCategory(null);
                setEditCatFormError(null);
                setEditCatFormSuccess(null);
              }}
              className="absolute top-4 right-4 p-2 text-[#6B6785] hover:text-[#1E1B2E] hover:bg-[#F5F2FF] rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#F5F2FF] border border-[#E8E3FF] flex items-center justify-center text-[#8B7FE8]">
                <Edit3 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-extrabold text-[#1E1B2E]">Edit Prompt Category</h3>
            </div>

            {editCatFormError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{editCatFormError}</span>
              </div>
            )}

            {editCatFormSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{editCatFormSuccess}</span>
              </div>
            )}

            <form onSubmit={handleUpdateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1E1B2E] mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editCatName}
                  onChange={(e) => setEditCatName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1E1B2E] mb-1">
                  Description <span className="text-[#6B6785] font-normal">(Optional)</span>
                </label>
                <textarea
                  value={editCatDesc}
                  onChange={(e) => setEditCatDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#6B6785] hover:bg-[#F5F2FF] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editCatSubmitting}
                  className="px-5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {editCatSubmitting ? "Saving..." : "Update Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CATEGORY CONFIRMATION MODAL */}
      {deletingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B2E]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#E8E3FF] shadow-soft-lg w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => {
                setDeletingCategory(null);
                setDeleteCatError(null);
              }}
              className="absolute top-4 right-4 p-2 text-[#6B6785] hover:text-[#1E1B2E] hover:bg-[#F5F2FF] rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-3 text-red-600">
              <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-[#1E1B2E]">Delete Category?</h3>
            </div>

            <p className="text-xs text-[#6B6785] leading-relaxed mb-4">
              Are you sure you want to delete category{" "}
              <strong className="text-[#1E1B2E]">"{deletingCategory.name}"</strong>? This action cannot be undone.
            </p>

            {deleteCatError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{deleteCatError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setDeletingCategory(null);
                  setDeleteCatError(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#6B6785] hover:bg-[#F5F2FF] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteCategory}
                disabled={deleteCatSubmitting}
                className="px-5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-red-600 hover:bg-red-700 shadow-soft-sm transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                {deleteCatSubmitting ? "Deleting..." : "Delete Category"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE PROMPT MODAL */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B2E]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#E8E3FF] shadow-soft-lg w-full max-w-lg p-6 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setShowPromptModal(false);
                setPromptFormError(null);
                setPromptFormSuccess(null);
              }}
              className="absolute top-4 right-4 p-2 text-[#6B6785] hover:text-[#1E1B2E] hover:bg-[#F5F2FF] rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#EBF8FF] border border-[#BEE3F8] flex items-center justify-center text-[#2B6CB0]">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-extrabold text-[#1E1B2E]">Add New Prompt</h3>
            </div>

            {promptFormError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{promptFormError}</span>
              </div>
            )}

            {promptFormSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{promptFormSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreatePrompt} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1E1B2E] mb-1">
                  Prompt Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={promptTitle}
                  onChange={(e) => setPromptTitle(e.target.value)}
                  placeholder="e.g. Next.js 15 React Component Generator"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1E1B2E] mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={promptCategoryId}
                  onChange={(e) => setPromptCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                  required
                >
                  <option value="">-- Select a Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1E1B2E] mb-1">
                  Prompt Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={promptType}
                  onChange={(e) => setPromptType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                  required
                >
                  <option value="FREE">FREE</option>
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="ONE_TIME_PREMIUM">ONE_TIME_PREMIUM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1E1B2E] mb-1">
                  Prompt Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={promptContent}
                  onChange={(e) => setPromptContent(e.target.value)}
                  placeholder="Write full system or user prompt template..."
                  rows={6}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-mono text-[11px] outline-none focus:border-[#8B7FE8]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPromptModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#6B6785] hover:bg-[#F5F2FF] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={promptSubmitting}
                  className="px-5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {promptSubmitting ? "Creating..." : "Save Prompt"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PROMPT MODAL */}
      {editingPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B2E]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#E8E3FF] shadow-soft-lg w-full max-w-lg p-6 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setEditingPrompt(null);
                setEditPromptFormError(null);
                setEditPromptFormSuccess(null);
              }}
              className="absolute top-4 right-4 p-2 text-[#6B6785] hover:text-[#1E1B2E] hover:bg-[#F5F2FF] rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#EBF8FF] border border-[#BEE3F8] flex items-center justify-center text-[#2B6CB0]">
                <Edit3 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-extrabold text-[#1E1B2E]">Edit Prompt Template</h3>
            </div>

            {editPromptFormError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{editPromptFormError}</span>
              </div>
            )}

            {editPromptFormSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{editPromptFormSuccess}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePrompt} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1E1B2E] mb-1">
                  Prompt Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editPromptTitle}
                  onChange={(e) => setEditPromptTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1E1B2E] mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={editPromptCategoryId}
                  onChange={(e) => setEditPromptCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1E1B2E] mb-1">
                  Prompt Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={editPromptType}
                  onChange={(e) => setEditPromptType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                  required
                >
                  <option value="FREE">FREE</option>
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="ONE_TIME_PREMIUM">ONE_TIME_PREMIUM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1E1B2E] mb-1">
                  Prompt Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={editPromptContent}
                  onChange={(e) => setEditPromptContent(e.target.value)}
                  rows={6}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-mono text-[11px] outline-none focus:border-[#8B7FE8]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPrompt(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#6B6785] hover:bg-[#F5F2FF] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editPromptSubmitting}
                  className="px-5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {editPromptSubmitting ? "Saving..." : "Update Prompt"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE PROMPT CONFIRMATION MODAL */}
      {deletingPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B2E]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#E8E3FF] shadow-soft-lg w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => {
                setDeletingPrompt(null);
                setDeletePromptError(null);
              }}
              className="absolute top-4 right-4 p-2 text-[#6B6785] hover:text-[#1E1B2E] hover:bg-[#F5F2FF] rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-3 text-red-600">
              <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-[#1E1B2E]">Delete Prompt?</h3>
            </div>

            <p className="text-xs text-[#6B6785] leading-relaxed mb-4">
              Are you sure you want to delete prompt{" "}
              <strong className="text-[#1E1B2E]">"{deletingPrompt.title}"</strong>? This action cannot be undone.
            </p>

            {deletePromptError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{deletePromptError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setDeletingPrompt(null);
                  setDeletePromptError(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#6B6785] hover:bg-[#F5F2FF] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeletePrompt}
                disabled={deletePromptSubmitting}
                className="px-5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-red-600 hover:bg-red-700 shadow-soft-sm transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                {deletePromptSubmitting ? "Deleting..." : "Delete Prompt"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
