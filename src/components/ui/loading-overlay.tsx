import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin text-sage-600" />
        <span className="text-sage-800 font-medium text-lg">Generating your nutrition guide...</span>
      </div>
    </div>
  );
} 