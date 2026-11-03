import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePlayer();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-14 left-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-md mx-auto">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-3 backdrop-blur-md border animate-in slide-in-from-top-3 ${
            toast.type === 'success'
              ? 'bg-[#063323]/95 border-emerald-500/40 text-emerald-100'
              : toast.type === 'error'
              ? 'bg-[#3b121e]/95 border-rose-500/40 text-rose-100'
              : 'bg-[#181d33]/95 border-purple-500/40 text-purple-100'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-pink-400" />}
            </div>
            <div>
              <h4 className="text-xs font-bold leading-tight tracking-wide">{toast.title}</h4>
              <p className="text-[11px] opacity-85 mt-0.5 line-clamp-2">{toast.message}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {toast.actionLabel && toast.onAction && (
              <button
                onClick={() => {
                  toast.onAction?.();
                  removeToast(toast.id);
                }}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
              >
                {toast.actionLabel}
              </button>
            )}
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-white/50 hover:text-white rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
