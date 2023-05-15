/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Grid } from "@mui/material";

type ContentPageProps = {
  children: React.ReactNode;
};
const ContentPage = ({ children }: ContentPageProps) => {
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={4} sx={{ height: "100%", overflow: "auto" }}>
        <div>{children}</div>
      </Grid>
      <Grid item xs={8} sx={{ height: "100%", padding: "20px !important" }}>
        <img
          loading="lazy"
          src="/space.jpg"
          width="100%"
          height="100%"
          style={{ borderRadius: "2%" }}
        />
      </Grid>
    </Grid>
  );
};

export default ContentPage;
