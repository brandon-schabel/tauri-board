import {
  ColorControlConfig,
  ColorKeyIds,
  SelectControlConfig,
  SelectKeyIds,
  SliderControlConfig,
  SliderKeyIds,
  controlsConfig,
} from "../configs/ui/controls";
import { AppControlStateGroupKeys, AppControlStateKeys } from "../types";
import { useAppState } from "../utils/use-app-state";
import { ColorPicker } from "./color-picker";
import { SelectDropdown } from "./select-dropdown";
import { Slider } from "./slider";

export const UIController = () => {
  const { updateColor, updateSelect, updateSlider, state } = useAppState();

  const renderColorControl = (
    controlConfig: ColorControlConfig,
    id: ColorKeyIds,
    value: string | undefined
  ) => (
    <ColorPicker
      id={id}
      color={value}
      onChange={(value) => updateColor(id, value)}
      config={controlConfig}
    />
  );

  const renderSelectControl = (
    controlConfig: SelectControlConfig,
    id: SelectKeyIds,
    value: string | undefined
  ) => (
    <SelectDropdown
      id={id}
      options={controlConfig.options}
      value={value}
      name={controlConfig.name}
      onChange={(value) => updateSelect(id, value)}
      config={controlConfig}
    />
  );

  const renderSliderControl = (
    controlConfig: SliderControlConfig,
    id: SliderKeyIds,
    value: number | undefined
  ) => (
    <Slider
      id={id}
      value={value}
      min={controlConfig.min}
      max={controlConfig.max}
      onChange={(value) => updateSlider(id, value)}
      config={controlConfig}
    />
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(controlsConfig).map(([groupKey, group]) => {
        const typedGroupKey = groupKey as AppControlStateGroupKeys;
        return Object.entries(group).map(([controlKey, controlConfig]) => {
          const id = controlKey as AppControlStateKeys<typeof typedGroupKey>;
          const value = state[typedGroupKey]?.[id];
          // if (!value) {
          //   console.error("Error no value ui-controller", { id, value, typedGroupKey });
          //   return null;
          // }
          switch (controlConfig.type) {
            case "color":
              return (
                <div key={controlKey}>
                  {renderColorControl(controlConfig, id as ColorKeyIds, value)}
                </div>
              );
            case "select":
              return (
                <div key={controlKey}>
                  {renderSelectControl(
                    controlConfig,
                    id as SelectKeyIds,
                    value
                  )}
                </div>
              );
            case "slider":
              return (
                <div key={controlKey}>
                  {renderSliderControl(
                    controlConfig,
                    id as SliderKeyIds,
                    value
                  )}
                </div>
              );
            default:
              return null;
          }
        });
      })}
    </div>
  );
};
