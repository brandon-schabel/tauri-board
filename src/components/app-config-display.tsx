import { CSSProperties } from "react";
import { useSimulateKeyboard } from "../tauri-hooks/use-simulate-keyboard";
import { AppConfigEntry } from "../types";
import { useAppState } from "../utils/use-app-state";

export const AppConfigDisplay = ({
  appConfig,
}: {
  appConfig: AppConfigEntry;
}) => {
  const { state } = useAppState();
  const { simulateKeyboardInput } = useSimulateKeyboard();

  const buttonStyle: CSSProperties = {
    backgroundColor: state.color?.btnBgColor,
    color: state.color?.btnColor,
    fontSize: state.slider?.btnTextSize
      ? `${state.slider?.btnTextSize}px`
      : "16px",
    height: `${state.select?.buttonSize}px`,
    width: `${state.select?.buttonSize}px`,
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${state.slider?.gridColumns || 3}, 1fr)`,
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">App Configuration:</h2>
      {appConfig && appConfig.appProfiles ? (
        <div className="grid gap-4" style={gridStyle}>
          {appConfig.appProfiles[0].configs.map((config, index) => {
            return (
              <button
                className={`relative bg-gray-400 hover:bg-opacity-75 rounded-lg p-4 flex flex-col items-center justify-center w-40 h-40`}
                style={buttonStyle}
                onClick={() => {
                  console.log("run macro here");

                  // 3 second delay then run simulateKeyboardInput
                  setTimeout(() => {
                    simulateKeyboardInput(config?.text || "test texttttttt");
                  }, 3000);
                }}
                key={index}
              >
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <p>No buttons configured.</p>
      )}
    </div>
  );
};
