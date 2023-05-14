import React from "react";
import { Grid } from "@mui/material";

type ContentPageProps = {
  children: React.ReactNode;
  controls?: React.ReactNode;
};
const ContentPage = ({ children, controls }: ContentPageProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <div>{children}</div>
      </Grid>
      <Grid item xs={8}>
        {controls}
      </Grid>
    </Grid>
  );
};

export default ContentPage;
