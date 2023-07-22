import { invoke } from "@tauri-apps/api";
import { createFetchFactory, defaultErrorHandler } from "instant-bun";
import React, { useEffect } from "react";
import "./app.css";
import { AppConfigDisplay } from "./components/app-config-display";
import { UIController } from "./components/ui-controller";
import defaultConfig from "./configs/apps/default.json";
import "./index.css";
import { StateProvider, useAppState } from "./utils/use-app-state";

export default function App() {
  return (
    <StateProvider>
      <AppBody />
    </StateProvider>
  );
}

// TODO: refactor the errror handler logic in the fetch factory, probably just
// throw error, but we may have an option to catch the error so we don't accidentally crash apps
const fetchFactory = createFetchFactory({
  baseUrl: "http://localhost:8080",
  errorHandler: defaultErrorHandler(),
});

function AppBody() {
  const { state } = useAppState();
  const [name, setName] = React.useState("");
  const [greetMsg, setGreetMsg] = React.useState("");

  const getData = async () => {
    console.log("running get data");
    try {
      await fetchFactory.get("/test");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
