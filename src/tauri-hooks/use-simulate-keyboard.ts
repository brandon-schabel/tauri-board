import { invoke } from "@tauri-apps/api/tauri";

export const useSimulateKeyboard = () => {
  // this technically doesn't need to be a hook but I plan to add some stateful logic
  const simulateKeyboardInput = async (text: string) => {
    console.log("simulateKeyboardInput", { text });
    console.log(window.__TAURI_IPC__);

    await invoke("simulate_keyboard_input", { input: text });
  };

  return { simulateKeyboardInput };
};
