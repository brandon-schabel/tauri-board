import { InputControlConfig } from "../configs/ui/controls";

export type InputProps = {
  id: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  config: InputControlConfig;
};

export const Input = ({ config, id, onChange, value }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div>
      {config?.title && <label htmlFor={id}>{config.title}</label>}
      <input id={id} onChange={handleChange}  />
    </div>
  );
};
