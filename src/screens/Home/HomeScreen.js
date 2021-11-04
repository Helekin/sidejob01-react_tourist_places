import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const HomeScreen = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={3}>
          <Typography>Welcome Admin</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeScreen;
