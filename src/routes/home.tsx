import { Link } from "@tanstack/router";
import { invoke } from "@tauri-apps/api";
import React from "react";
import "../app.css";
import { AppConfigDisplay } from "../components/app-config-display";
import { UIController } from "../components/ui-controller";
import defaultConfig from "../configs/apps/default.json";
import "../index.css";
import { useAppState } from "../utils/use-app-state";

export function HomePage() {
  const { state } = useAppState();
  const [name, setName] = React.useState("");
  const [greetMsg, setGreetMsg] = React.useState("");

  console.log({ state });

  // Update background when colors change
  const selectedBgColor = state.color?.bgColor || "#000000";
  const docBackgroundColor = document?.body.style.backgroundColor;

  if (selectedBgColor !== docBackgroundColor) {
    document.body.style.backgroundColor = selectedBgColor;
  }

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="font-sans text-base leading-6 min-h-screen p-4">
      <UIController />
      <div className="mt-8">
        <AppConfigDisplay appConfig={defaultConfig} />
      </div>
      {greetMsg}

      <pre className="mt-8">{JSON.stringify(state, null, 2)}</pre>

      <div className="row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <Link to="" />
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>
      </div>
      <p>{greetMsg}</p>
    </div>
  );
}
