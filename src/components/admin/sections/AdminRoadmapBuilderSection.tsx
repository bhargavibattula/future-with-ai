"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Copy,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  BookOpen,
  HelpCircle,
  Trophy,
  Zap,
  Lock,
  Check,
  Play,
  Grid,
  Maximize2,
  Move,
  Edit,
} from "lucide-react";
import { INITIAL_ROADMAP_BUILDER_NODES, RoadmapNode } from "@/data/adminData";
import { motion } from "framer-motion";

export default function AdminRoadmapBuilderSection() {
  const [nodes, setNodes] = useState<RoadmapNode[]>(INITIAL_ROADMAP_BUILDER_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("node-1");
  const [zoomScale, setZoomScale] = useState(1);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  // Add Node Action
  const handleAddNode = (type: "module" | "quiz" | "certificate") => {
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode ? (lastNode.x === 160 ? 540 : 160) : 160;
    const newY = lastNode ? lastNode.y + 140 : 100;

    const newNode: RoadmapNode = {
      id: `node-${Date.now()}`,
      title: type === "module" ? "New Module Unit" : type === "quiz" ? "Interactive Quiz" : "Verified Certificate",
      type,
      x: newX,
      y: newY,
      status: "locked",
      xp: type === "certificate" ? 500 : 200,
      duration: type === "quiz" ? "20m" : "40m",
      icon: type === "module" ? "BookOpen" : type === "quiz" ? "HelpCircle" : "Trophy",
    };

    setNodes([...nodes, newNode]);
    setSelectedNodeId(newNode.id);
  };

  // Node Drag Handler inside Canvas
  const handleNodeDrag = (id: string, deltaX: number, deltaY: number) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              x: Math.max(80, Math.min(620, n.x + deltaX)),
              y: Math.max(50, Math.min(1200, n.y + deltaY)),
            }
          : n
      )
    );
  };

  // Auto Layout
  const handleAutoLayout = () => {
    setNodes((prev) =>
      prev.map((n, idx) => ({
        ...n,
        x: idx % 2 === 0 ? 160 : 540,
        y: 70 + idx * 140,
      }))
    );
  };

  // Node Delete
  const handleDeleteNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  // Node Update
  const handleUpdateSelectedNode = (field: keyof RoadmapNode, value: any) => {
    if (!selectedNodeId) return;
    setNodes((prev) =>
      prev.map((n) => (n.id === selectedNodeId ? { ...n, [field]: value } : n))
    );
  };

  return (
    <div className="space-y-6 select-none">
      {/* HEADER & CANVAS CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#FFC9DE] text-[#C0336A] border border-[#FFB0CC] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Figma-Style Visual Canvas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] tracking-tight">
            Visual <span className="text-[#8B7FE8]">Roadmap Builder</span>
          </h2>
        </div>

        {/* TOP TOOLBAR */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleAddNode("module")}
            className="px-3.5 py-2 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Module Node</span>
          </button>
          <button
            type="button"
            onClick={() => handleAddNode("quiz")}
            className="px-3.5 py-2 rounded-2xl text-xs font-extrabold text-[#1E1B2E] bg-[#F5F2FF] border border-[#E8E3FF] hover:bg-[#8B7FE8] hover:text-white transition-all flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-[#8B7FE8]" />
            <span>+ Quiz Node</span>
          </button>
          <button
            type="button"
            onClick={() => handleAddNode("certificate")}
            className="px-3.5 py-2 rounded-2xl text-xs font-extrabold text-[#1E1B2E] bg-[#FFF0F5] border border-[#FFC9DE] hover:bg-[#FF9EB3] hover:text-white transition-all flex items-center gap-1.5"
          >
            <Trophy className="w-4 h-4 text-[#C0336A]" />
            <span>+ Cert Node</span>
          </button>
          <button
            type="button"
            onClick={handleAutoLayout}
            className="p-2 rounded-2xl bg-white border border-[#E8E3FF] text-[#6B6785] hover:text-[#8B7FE8] shadow-soft-sm"
            title="Auto Layout Nodes"
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* WORKSPACE CANVAS + SIDE INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CANVAS CANVAS (8 COLS ON DESKTOP) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8E3FF] shadow-soft p-4 relative overflow-hidden">
          {/* Canvas Control Floating Toolbar */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-[#E8E3FF] px-3 py-1.5 rounded-2xl shadow-soft-sm">
            <button
              onClick={() => setZoomScale(Math.min(1.4, zoomScale + 0.1))}
              className="p-1 text-[#6B6785] hover:text-[#8B7FE8]"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-xs font-extrabold text-[#1E1B2E]">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => setZoomScale(Math.max(0.6, zoomScale - 0.1))}
              className="p-1 text-[#6B6785] hover:text-[#8B7FE8]"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomScale(1)}
              className="p-1 text-[#6B6785] hover:text-[#8B7FE8] border-l border-[#E8E3FF] pl-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* DOT GRID CANVAS BACKGROUND */}
          <div
            ref={canvasRef}
            className="w-full h-[640px] relative overflow-auto rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] bg-[radial-gradient(#8B7FE8_1.2px,transparent_1.2px)] [background-size:24px_24px]"
            style={{ transform: `scale(${zoomScale})`, transformOrigin: "top left" }}
          >
            {/* SOLID 6PX SVG CONNECTORS DRAWN BETWEEN SORTED NODES */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              viewBox="0 0 700 900"
            >
              <defs>
                <linearGradient id="activeGradientPath" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#74D99F" />
                  <stop offset="100%" stopColor="#8B7FE8" />
                </linearGradient>
              </defs>

              {nodes.slice(0, -1).map((curr, idx) => {
                const next = nodes[idx + 1];
                if (!next) return null;

                // Compute orthogonal 6px thick connector path between node edges
                const isLeftToRight = curr.x < next.x;
                const startX = isLeftToRight ? curr.x + 39 : curr.x - 39;
                const startY = curr.y;
                const endX = next.x;
                const endY = next.y - 39;

                const cornerX = isLeftToRight ? endX - 25 : endX + 25;
                const strokeColor =
                  curr.status === "completed"
                    ? "#74D99F"
                    : curr.status === "current"
                    ? "url(#activeGradientPath)"
                    : "#E9E2FF";

                return (
                  <path
                    key={`path-${curr.id}-${next.id}`}
                    d={`M ${startX} ${startY} L ${cornerX} ${startY} Q ${endX} ${startY} ${endX} ${
                      startY + 25
                    } L ${endX} ${endY}`}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                );
              })}
            </svg>

            {/* DRAGGABLE NODE TILES */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isCompleted = node.status === "completed";
              const isCurrent = node.status === "current";

              return (
                <div
                  key={node.id}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                  }}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-move group select-none ${
                    isSelected ? "ring-4 ring-[#8B7FE8]/30 rounded-3xl" : ""
                  }`}
                >
                  {/* 78px Rounded Square Tile */}
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className={`w-[78px] h-[78px] rounded-[22px] flex items-center justify-center relative border-2 transition-all ${
                      isCompleted
                        ? "bg-gradient-to-br from-[#74D99F] to-[#52C582] border-white text-white shadow-[0_10px_25px_rgba(116,217,159,0.35)]"
                        : isCurrent
                        ? "bg-gradient-to-br from-[#8B7FE8] to-[#786BD6] border-white text-white shadow-[0_12px_32px_rgba(139,127,232,0.45)] animate-pulse"
                        : "bg-white border-[#E8E3FF] text-[#8B7FE8] shadow-soft-sm"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-8 h-8 stroke-[3.5] text-white" />
                    ) : isCurrent ? (
                      <Play className="w-7 h-7 fill-white text-white ml-0.5" />
                    ) : node.type === "certificate" ? (
                      <Trophy className="w-7 h-7 text-[#8B7FE8]" />
                    ) : node.type === "quiz" ? (
                      <HelpCircle className="w-7 h-7 text-[#8B7FE8]" />
                    ) : (
                      <Lock className="w-6 h-6 text-[#8B7FE8]/70" />
                    )}

                    {/* Move Drag Badge */}
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-[#E8E3FF] flex items-center justify-center text-[#8B7FE8] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <Move className="w-3 h-3" />
                    </span>
                  </motion.div>

                  {/* Title Label Under Tile */}
                  <div className="mt-2 text-center max-w-[150px]">
                    <span className="text-xs font-extrabold text-[#1E1B2E] leading-tight block">
                      {node.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDE NODE INSPECTOR PANEL (4 COLS ON DESKTOP) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E8E3FF] p-5 shadow-soft">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E3FF] pb-3">
                <div className="flex items-center gap-2">
                  <Edit className="w-4 h-4 text-[#8B7FE8]" />
                  <h3 className="text-sm font-extrabold text-[#1E1B2E]">
                    Node Inspector
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteNode(selectedNode.id)}
                  className="p-1.5 rounded-xl text-red-500 hover:bg-red-50"
                  title="Delete Node"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Node Title */}
              <div>
                <label className="text-[11px] font-extrabold text-[#1E1B2E] block mb-1">
                  Node Title
                </label>
                <input
                  type="text"
                  value={selectedNode.title}
                  onChange={(e) => handleUpdateSelectedNode("title", e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                />
              </div>

              {/* Node Status */}
              <div>
                <label className="text-[11px] font-extrabold text-[#1E1B2E] block mb-1">
                  Status State
                </label>
                <select
                  value={selectedNode.status}
                  onChange={(e) => handleUpdateSelectedNode("status", e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F5F2FF] border border-[#E8E3FF] text-xs font-bold outline-none text-[#1E1B2E]"
                >
                  <option value="completed">Completed ✓</option>
                  <option value="current">Current ⚡</option>
                  <option value="locked">Locked 🔒</option>
                </select>
              </div>

              {/* XP & Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-extrabold text-[#1E1B2E] block mb-1">
                    XP Reward
                  </label>
                  <input
                    type="number"
                    value={selectedNode.xp}
                    onChange={(e) => handleUpdateSelectedNode("xp", Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-extrabold text-[#1E1B2E] block mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={selectedNode.duration}
                    onChange={(e) => handleUpdateSelectedNode("duration", e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E3FF] text-[11px] font-bold text-[#6B6785]">
                <span>Coordinates: X: {selectedNode.x}px, Y: {selectedNode.y}px</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-xs font-bold text-[#6B6785]">
              Select any node on the canvas to inspect and edit properties.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
