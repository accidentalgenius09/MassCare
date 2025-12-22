"use client";

import { Toaster, ToastBar, toast } from "react-hot-toast";
import { X, AlertTriangle } from "lucide-react";

export default function CustomToaster() {
  return (
    <Toaster position="top-right">
      {(t) => (
        <ToastBar
          toast={t}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          {({ icon, message }) => (
            <>
              {t.type === "error" ? (
                <AlertTriangle size={16} strokeWidth={2.5} color="#FF0000" />
              ) : (
                { icon }
              )}
              <span style={{ flex: 1 }}>{message}</span>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="flex-shrink-0 cursor-pointer rounded p-1.5 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close notification"
                style={{
                  color: "#fff",
                  backgroundColor: "#3341D6",
                  minWidth: "24px",
                  minHeight: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "auto",
                }}
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
