import { useEffect } from "react";
import { ControlState } from "../configs/ui/controls";

export const useSyncStateToLocalStorage = (
  state: ControlState,
  { autoSaveInterval = 2000, autoSaveEnabled = false } = {
    autoSaveInterval: 2000,
    autoSaveEnabled: false,
  }
) => {
  // start an interval to sync state to local storage periodically
  useEffect(() => {
    // only sync if there has been activity
    if (!state.slider && !state.select && !state.color) return;

    const interval = setInterval(() => {
      localStorage.setItem("config", JSON.stringify(state));
    }, autoSaveInterval);
    return () => clearInterval(interval);
  }, []);
};
