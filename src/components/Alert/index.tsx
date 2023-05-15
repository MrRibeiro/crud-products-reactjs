import React from "react";
import { Close } from "@mui/icons-material";
import { Alert, Collapse, IconButton } from "@mui/material";

import { AlertCustomProps } from "./types";

const AlertCustom = ({
  message,
  severity,
  open,
  setOpen,
  testID,
}: AlertCustomProps) => {
  return (
    <Collapse in={open}>
      <Alert
        data-testid={testID}
        severity={severity}
        sx={{ marginBottom: "32px" }}
        action={
          setOpen ? (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          ) : (
            <IconButton aria-label="close" color="inherit" size="small">
              <Close fontSize="inherit" />
            </IconButton>
          )
        }
      >
        {message} <a href="/">Voltar</a>
      </Alert>
    </Collapse>
  );
};

export default AlertCustom;
