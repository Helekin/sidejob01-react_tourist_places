import React from "react";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Grid container justifyContent="center">
      <CircularProgress color="inherit" />
    </Grid>
  );
};

export default Loader;
