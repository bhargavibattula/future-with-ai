"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableItemProps {
  id: string;
  text: string;
  index: number;
}

function SortableItem({ id, text, index }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-4 bg-white border rounded-xl shadow-soft-sm mb-3 ${
        isDragging ? "border-[#8B7FE8] shadow-md ring-2 ring-[#8B7FE8]/20" : "border-[#EAE6FE]"
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab hover:bg-[#F3F0FE] p-1.5 rounded-lg text-[#6B6785] hover:text-[#8B7FE8] transition-colors"
      >
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="w-8 h-8 rounded-lg bg-[#F3F0FE] text-[#8B7FE8] flex items-center justify-center font-bold text-sm shrink-0">
        {index + 1}
      </div>
      <span className="font-semibold text-[#1E1B2E]">{text}</span>
    </div>
  );
}

export function DragAndDropOrdering({
  items,
  onChange,
}: {
  items: { id: string; text: string }[];
  onChange: (orderedIds: string[]) => void;
}) {
  const [activeItems, setActiveItems] = useState(items);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    // Notify parent component of current order
    onChange(activeItems.map((item) => item.id));
  }, [activeItems]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setActiveItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={activeItems.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {activeItems.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              text={item.text}
              index={index}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
