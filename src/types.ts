import { ColorKeyIds, SelectKeyIds, SliderKeyIds } from "./configs/ui/controls";

export type ConfigSquare = {
  title: string;
  hotkeys?: string[];
  enterAfterText?: boolean;
  text?: string;
};

// you can have multiple configurations for a single app
export type ConfigurationSetup = {
  name: string;
  configs: ConfigSquare[];
};

// TypeScript config type
export type AppPreference = {
  appName: string;
  variables?: { [key: string]: string };
  configurations: ConfigurationSetup[];
};

type ProfileConfig = {
  label: string;
  hotkeys?: string[];
  enterAfterText?: boolean;
  text?: string;
};

type AppProfile = {
  name: string;
  configs: ProfileConfig[];
};

// type made from default.json
export interface AppConfigEntry {
  appName: string;
  variables: {
    audioPath: string;
  };
  appProfiles: AppProfile[];
}

// ColorControlIds
// SelectControlIds
// SliderControlIds
// maybe find a way to auto infer these values based on the files or something
export interface AppControlState {
  slider?: Record<SliderKeyIds, number>;
  select?: Record<SelectKeyIds, string>;
  color?: Record<ColorKeyIds, string>;
}

export type AppControlStateGroupKeys = keyof AppControlState;

export type AppControlStateKeys<T extends AppControlStateGroupKeys> =
  keyof AppControlState[T];
