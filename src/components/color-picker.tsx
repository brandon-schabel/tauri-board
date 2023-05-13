import React, { useState } from "react";
import { ColorControlConfig } from "../configs/ui/controls";

type ColorPickerProps = {
  id: string;
  color: string | undefined;
  onChange: (color: string) => void;
  config: ColorControlConfig;
};

export const ColorPicker = ({
  id,
  color,
  onChange,
  config,
}: ColorPickerProps) => {
  const [currentColor, setCurrentColor] = useState(color);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setCurrentColor(newColor);
    onChange(newColor); // Pass id and newColor as arguments
  };

  return (
    <div className="flex flex-row items-center ml-4">
      <label htmlFor={id} className="block  bg-white p-1 rounded">
        {config.title}
      </label>

      <input
        type="color"
        id={id}
        value={currentColor}
        onChange={handleChange}
        className="w-8 h-8 rounded mx-1"
      />
      <div className="bg-white rounded p-1">{currentColor}</div>
    </div>
  );
};
