export type Option = {
  value: string;
  label: string;
};

export type ColorControlConfig = {
  type: "color";
  component: "native-color";
  title?: string;
  info?: string;
  name: string;
  defaultValue: string;
};

export type SelectControlConfig = {
  // can eventually support more types of select(aka dropdown) controls
  type: "select";
  component: "native-select";
  name: string;
  title?: string;
  info?: string;
  defaultValue: string;
  options: Option[];
};

export type SliderControlConfig = {
  // right now slider only supports the native input slider, but eventually we will support more, this can be a union type
  type: "slider";
  component: "native-slider";
  title?: string;
  info?: string;
  name: string;
  defaultValue: number;
  min: number;
  max: number;
};

const colorControls = {
  btnBgColor: {
    type: "color",
    component: "native-color",
    title: "Button Background Color",
    name: "Button Background Color",
    defaultValue: "#a8a8a8",
  } as ColorControlConfig,
  btnColor: {
    type: "color",
    component: "native-color",
    title: "Button Text Color",
    name: "Button Text Color",
    defaultValue: "#000000",
  } as ColorControlConfig,
  bgColor: {
    type: "color",
    component: "native-color",
    title: "Background Color",
    name: "Background Color",
    defaultValue: "#ffffff",
  } as ColorControlConfig,
};

const selectControls = {
  buttonSize: {
    type: "select",
    component: "native-select",
    name: "Button Size",
    defaultValue: "192",
    options: [
      {
        value: "32",
        label: "32px x 32px",
      },
      {
        value: "64",
        label: "64px x 64px",
      },
      {
        value: "128",
        label: "128px x 128px",
      },
      {
        value: "192",
        label: "192px x 192px",
      },
      {
        value: "256",
        label: "256px x 256px",
      },
    ],
  } as SelectControlConfig,
};

const sliderControls = {
  btnTextSize: {
    type: "slider",
    component: "native-slider",
    name: "Button Text Size",
    defaultValue: 16,
    min: 8,
    max: 48,
  } as SliderControlConfig,
  gridColumns: {
    type: "slider",
    component: "native-slider",
    name: "Grid Columns",
    defaultValue: 3,
    min: 1,
    max: 6,
  } as SliderControlConfig,
};

export const controlsConfig = {
  colorControls,
  selectControls,
  sliderControls,
};

export type ControlConfig = {
  colorControls: Record<ColorKeyIds, ColorControlConfig>;
  selectControls: Record<SelectKeyIds, SelectControlConfig>;
  sliderControls: Record<SliderKeyIds, SliderControlConfig>;
};

export type ColorKeyIds = keyof typeof controlsConfig.colorControls; // "btnBgColor" | "btnColor" | "bgColor"
export type SelectKeyIds = keyof typeof controlsConfig.selectControls; // "buttonSize"
export type SliderKeyIds = keyof typeof controlsConfig.sliderControls; // "btnTextSize" | "gridColumns"

export type ControlState = {
  slider: Record<SliderKeyIds, number>;
  select: Record<SelectKeyIds, string>;
  color: Record<ColorKeyIds, string>;
};

export function getDefaultControlState(): ControlState {
  const sliderDefaults: Record<SliderKeyIds, number> = {} as any;
  const selectDefaults: Record<SelectKeyIds, string> = {} as any;
  const colorDefaults: Record<ColorKeyIds, string> = {} as any;

  for (const key in controlsConfig.sliderControls) {
    const controlId = key as SliderKeyIds;
    sliderDefaults[controlId] =
      controlsConfig.sliderControls[controlId].defaultValue;
  }

  for (const key in controlsConfig.selectControls) {
    const controlId = key as SelectKeyIds;
    selectDefaults[controlId] =
      controlsConfig.selectControls[controlId].defaultValue;
  }

  for (const key in controlsConfig.colorControls) {
    const controlId = key as ColorKeyIds;
    colorDefaults[controlId] =
      controlsConfig.colorControls[controlId].defaultValue;
  }

  return {
    slider: sliderDefaults,
    select: selectDefaults,
    color: colorDefaults,
  };
}
