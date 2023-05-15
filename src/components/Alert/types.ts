import { Dispatch, SetStateAction } from "react";
import { AlertColor } from "@mui/material";

export interface AlertCustomProps {
  message: string;
  severity: AlertColor | undefined;
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  testID?: string;
}
