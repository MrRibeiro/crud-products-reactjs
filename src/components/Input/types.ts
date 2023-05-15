import { FieldError } from "react-hook-form";

export interface InputProps {
  type?: string;
  label?: string;
  value: string | number;
  className?: string;
  error?: FieldError;
  disabled?: boolean;
  width?: string;
  startAdornment?: string;
  endAdornment?: React.ReactNode;
  helperText?: string;
  setValue(value: string): void;
  testID?: string;
}
