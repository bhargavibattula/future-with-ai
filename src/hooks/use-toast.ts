import { useState, useCallback } from "react";

export function useToast() {
  const [toastMessage, setToastMessage] = useState<{ title: string; description?: string; variant?: "default" | "destructive" } | null>(null);

  const toast = useCallback(({ title, description, variant }: { title: string; description?: string; variant?: "default" | "destructive" }) => {
    // Basic implementation - in a real app this would use context
    // For now, let's just log to console to prevent the build error, 
    // or maybe simple alert if it's destructive
    if (variant === "destructive") {
      console.error(`Toast Error: ${title} - ${description}`);
      alert(`${title}: ${description}`);
    } else {
      console.log(`Toast Success: ${title} - ${description}`);
      alert(`${title}: ${description}`);
    }
  }, []);

  return { toast };
}
