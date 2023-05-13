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

function AppBody() {
  const { state } = useAppState();

  console.log({ state });

  // Update background when colors change
  const selectedBgColor = state.color?.bgColor || "#000000";
  const docBackgroundColor = document?.body.style.backgroundColor;

  if (selectedBgColor !== docBackgroundColor) {
    document.body.style.backgroundColor = selectedBgColor;
  }

  return (
    <div className="font-sans text-base leading-6 min-h-screen p-4">
      <UIController />
      <div className="mt-8">
        <AppConfigDisplay appConfig={defaultConfig} />
      </div>

      <pre className="mt-8">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
