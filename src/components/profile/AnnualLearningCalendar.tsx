"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { CalendarDays } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface HeatmapDay {
  date: string;
  dayOfWeek: number; // 0 = Sunday
  month: number;     // 0 = January
  year: number;
  count: number;
  level: number;
  details: { lessons: number; quizzes: number; challenges: number; xp: number };
}

interface Stats {
  totalSubmissions: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
}

// ─── Visual constants ───────────────────────────────────────────────────────

const SQ  = 11;          // cell size in px
const GAP =  3;          // gap between cells
const STEP = SQ + GAP;   // 14 px per column / row

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// Violet brand heatmap — matches the project's indigo/violet palette
const COLORS = ["#edeafd","#c4b5fd","#a78bfa","#7c3aed","#4c1d95"];
const BORDERS = [
  "rgba(99,79,226,0.12)",
  "rgba(99,79,226,0.25)",
  "rgba(99,79,226,0.40)",
  "rgba(99,79,226,0.55)",
  "rgba(99,79,226,0.70)",
];

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Build week columns.
 * The first column is padded with nulls for the days before the first
 * real day (i.e. if the first day falls on Wednesday = row 3, rows 0-2 are null).
 * This is exactly how GitHub renders it.
 */
function buildColumns(days: HeatmapDay[]): (HeatmapDay | null)[][] {
  if (!days.length) return [];
  const cols: (HeatmapDay | null)[][] = [];
  let col: (HeatmapDay | null)[] = Array(7).fill(null);
  let row = days[0].dayOfWeek; // start at first day's DOW

  for (const day of days) {
    col[row] = day;
    row++;
    if (row === 7) { cols.push(col); col = Array(7).fill(null); row = 0; }
  }
  if (row > 0) cols.push(col);
  return cols;
}

/**
 * Derive month label positions.
 * Emit a label whenever the first visible day in a column belongs to a new
 * month that we haven't labelled yet, and only if there's enough horizontal
 * room (≥ 2 cols since the last label) to avoid crowding.
 */
function buildMonthLabels(cols: (HeatmapDay | null)[][]): { label: string; col: number }[] {
  const result: { label: string; col: number }[] = [];
  let lastMonth = -1;
  let lastCol   = -5;

  cols.forEach((col, ci) => {
    const first = col.find(Boolean);
    if (!first) return;
    if (first.month !== lastMonth && ci - lastCol >= 2) {
      result.push({ label: MONTH_NAMES[first.month], col: ci });
      lastMonth = first.month;
      lastCol   = ci;
    }
  });
  return result;
}

// ─── Tooltip ────────────────────────────────────────────────────────────────

function Tooltip({ day, rect }: { day: HeatmapDay; rect: DOMRect }) {
  const label = new Date(day.date + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  });

  return (
    <div style={{
      position: "fixed",
      left:  rect.left + rect.width  / 2,
      top:   rect.top  - 8,
      transform: "translate(-50%,-100%)",
      zIndex: 9999,
      pointerEvents: "none",
      background: "#1E1B2E",
      color: "#fff",
      border: "1px solid rgba(139,92,246,0.4)",
      borderRadius: 10,
      padding: "9px 13px",
      fontSize: 12,
      lineHeight: 1.55,
      minWidth: 170,
      boxShadow: "0 8px 24px rgba(0,0,0,0.32)",
      whiteSpace: "nowrap",
    }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      <div style={{ color: day.count === 0 ? "#94a3b8" : "#c4b5fd" }}>
        {day.count === 0 ? "No activity" : `${day.count} ${day.count === 1 ? "activity" : "activities"}`}
      </div>
      {day.details.xp       > 0 && <div>⚡ {day.details.xp} XP earned</div>}
      {day.details.lessons  > 0 && <div>📖 {day.details.lessons} lesson{day.details.lessons  > 1 ? "s" : ""}</div>}
      {day.details.quizzes  > 0 && <div>✅ {day.details.quizzes} quiz{day.details.quizzes    > 1 ? "zes" : ""}</div>}
      {day.details.challenges > 0 && <div>🎯 {day.details.challenges} challenge{day.details.challenges > 1 ? "s" : ""}</div>}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AnnualLearningCalendar() {
  const [days,    setDays]    = useState<HeatmapDay[]>([]);
  const [stats,   setStats]   = useState<Stats>({ totalSubmissions: 0, activeDays: 0, currentStreak: 0, longestStreak: 0 });
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<{ day: HeatmapDay; rect: DOMRect } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/reports/heatmap")
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setDays(data.days ?? []);
          setStats({
            totalSubmissions: data.totalSubmissions ?? 0,
            activeDays:       data.activeDays       ?? 0,
            currentStreak:    data.currentStreak    ?? 0,
            longestStreak:    data.longestStreak    ?? 0,
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Auto-scroll to the rightmost (most-recent) week
  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading]);

  const cols        = buildColumns(days);
  const monthLabels = buildMonthLabels(cols);
  const numCols     = cols.length;

  const onEnter = useCallback((day: HeatmapDay, e: React.MouseEvent<HTMLDivElement>) => {
    setHovered({ day, rect: (e.currentTarget as HTMLElement).getBoundingClientRect() });
  }, []);
  const onLeave = useCallback(() => setHovered(null), []);

  // ── Left gutter for day labels ─────────────────────────────────────────────
  const LEFT_GUTTER = 28; // px — just enough for "Wed"

  return (
    <>
      <style>{`
        .cal-cell {
          width: ${SQ}px; height: ${SQ}px; border-radius: 2px;
          cursor: pointer; transition: transform .1s, outline .1s;
          box-sizing: border-box;
        }
        .cal-cell:hover { transform: scale(1.5); outline: 1.5px solid #8b5cf6; z-index: 10; position: relative; }
        .cal-scroll { overflow-x: auto; overflow-y: visible; }
        .cal-scroll::-webkit-scrollbar { height: 4px; }
        .cal-scroll::-webkit-scrollbar-thumb { background: rgba(139,92,246,.3); border-radius: 4px; }
        .cal-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      {/* ── Card ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: "#fff",
        border: "1px solid #EAE6FE",
        borderRadius: 20,
        padding: "18px 20px 16px",
        boxShadow: "0 2px 12px rgba(139,92,246,.07)",
      }}>

        {/* ── Header row ─────────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CalendarDays style={{ width: 18, height: 18, color: "#7c3aed" }} />
            <span style={{ fontSize: 15, fontWeight: 800, color: "#1E1B2E" }}>Annual Learning Calendar</span>
          </div>

          {/* Compact stat pills */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {[
              { label: "Contributions", val: stats.totalSubmissions },
              { label: "Active Days",   val: stats.activeDays },
              { label: "Streak",        val: `${stats.currentStreak}d` },
              { label: "Longest",       val: `${stats.longestStreak}d` },
            ].map(s => (
              <span key={s.label} style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                padding: "3px 10px", borderRadius: 999,
                background: "rgba(139,92,246,.08)", border: "1px solid rgba(139,92,246,.18)",
                fontSize: 11, fontWeight: 700, color: "#1E1B2E", whiteSpace: "nowrap",
              }}>
                <span style={{ color: "#7c3aed" }}>{s.val}</span>
                <span style={{ color: "#6B6785", fontWeight: 600 }}>{s.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Calendar area ──────────────────────────────────────────────── */}
        {loading ? (
          <div style={{ height: 110, borderRadius: 10, background: "#f3f0fe", animation: "pulse 1.6s ease infinite" }} />
        ) : (
          <div ref={scrollRef} className="cal-scroll" style={{ paddingBottom: 4 }}>
            <div style={{ display: "inline-flex", gap: 0, minWidth: "max-content" }}>

              {/* ── Day-of-week gutter ─────────────────────────────────── */}
              <div style={{
                width: LEFT_GUTTER, flexShrink: 0,
                display: "flex", flexDirection: "column",
                paddingTop: 18, // offset to align with grid rows (below month labels)
                gap: GAP,
              }}>
                {DAY_LABELS.map((d, i) => (
                  <div key={d} style={{
                    height: SQ, lineHeight: `${SQ}px`,
                    fontSize: 9, fontWeight: 700, color: "#9895b0",
                    textAlign: "right", paddingRight: 4,
                    // Only render Mon / Wed / Fri like GitHub
                    visibility: (i === 1 || i === 3 || i === 5) ? "visible" : "hidden",
                  }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* ── Grid (month labels + cells) ────────────────────────── */}
              <div style={{ position: "relative" }}>

                {/* Month labels — absolutely positioned at each column offset */}
                <div style={{ position: "relative", height: 16, marginBottom: 2, pointerEvents: "none" }}>
                  {monthLabels.map((m, idx) => (
                    <span key={`${m.label}-${idx}`} style={{
                      position: "absolute",
                      left: m.col * STEP,
                      top: 0,
                      fontSize: 11, fontWeight: 700, color: "#6B6785",
                      whiteSpace: "nowrap", lineHeight: "16px",
                    }}>
                      {m.label}
                    </span>
                  ))}
                </div>

                {/* Week columns */}
                <div style={{ display: "flex", gap: GAP }}>
                  {cols.map((col, ci) => (
                    <div key={ci} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                      {col.map((day, ri) =>
                        day ? (
                          <div
                            key={day.date}
                            className="cal-cell"
                            onMouseEnter={e => onEnter(day, e)}
                            onMouseLeave={onLeave}
                            style={{
                              background: COLORS[day.level],
                              border: `1px solid ${BORDERS[day.level]}`,
                            }}
                          />
                        ) : (
                          <div key={`e-${ci}-${ri}`} style={{ width: SQ, height: SQ, flexShrink: 0 }} />
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Legend + hint ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, marginTop: 10 }}>
          <span style={{ fontSize: 10, color: "#9895b0", fontWeight: 600 }}>Less</span>
          {[0,1,2,3,4].map(l => (
            <div key={l} title={["No activity","1-2 activities","3-5 activities","6-10 activities","10+ activities"][l]} style={{
              width: 11, height: 11, borderRadius: 2,
              background: COLORS[l], border: `1px solid ${BORDERS[l]}`,
            }} />
          ))}
          <span style={{ fontSize: 10, color: "#9895b0", fontWeight: 600 }}>More</span>
        </div>
      </div>

      {hovered && <Tooltip day={hovered.day} rect={hovered.rect} />}

      <style>{`
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }
      `}</style>
    </>
  );
}
