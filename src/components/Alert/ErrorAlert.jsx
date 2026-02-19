
import { useState, useEffect } from "react"
import { AlertTriangle, X } from "lucide-react"

const ErrorAlert = ({ message, onClose, duration = 6000 }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false)
        if (onClose) onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  if (!visible) return null

  return (
    <div className="fixed top-20 right-6 z-50 flex items-center gap-3 rounded-lg border border-red-600/30 bg-red-900/90 px-5 py-4 shadow-lg backdrop-blur-sm">
      <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
      <p className="text-sm font-medium text-red-100">{message}</p>
      <button
        type="button"
        onClick={() => {
          setVisible(false)
          if (onClose) onClose()
        }}
        className="ml-2 text-red-300 hover:text-red-100"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ErrorAlert
