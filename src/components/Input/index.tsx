import React, { ChangeEvent } from "react";
import { InputAdornment, TextField } from "@mui/material";

import { InputProps } from "./types";

const Input = ({
  type,
  label,
  className,
  value,
  setValue,
  error,
  disabled,
  width,
  startAdornment,
  endAdornment,
  helperText,
  testID,
}: InputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      type={type || "text"}
      data-testid={testID}
      className={className || ""}
      variant="outlined"
      label={label}
      value={value}
      disabled={disabled}
      error={Boolean(error)}
      helperText={error?.message || helperText}
      onChange={handleChange}
      InputProps={{
        startAdornment: startAdornment && (
          <InputAdornment aria-label="start" position="start">
            {startAdornment}
          </InputAdornment>
        ),
        endAdornment: endAdornment && (
          <InputAdornment aria-label="end" position="end">
            {endAdornment}
          </InputAdornment>
        ),
      }}
      sx={{ width: width || 280 }}
    />
  );
};

export default Input;
