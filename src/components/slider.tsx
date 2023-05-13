import React from "react";
import { SliderControlConfig } from "../configs/ui/controls";

export type SliderProps = {
  value: number | undefined;
  min: number;
  max: number;
  id: string;
  onChange: (value: number) => void;
  config: SliderControlConfig;
};

export const Slider = ({
  value,
  onChange,
  min,
  max,
  id,
  config,
}: SliderProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(event.target.value, 10));
  };

  return (
    <input
      type="range"
      id={id}
      value={value}
      min={min}
      max={max}
      onChange={handleChange}
      className="input input-bordered w-full"
    />
  );
};
