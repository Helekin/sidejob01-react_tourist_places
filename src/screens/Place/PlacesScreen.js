import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const PlacesScreen = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Grid item>
              <Button variant="contained">
                Nuevo lugar
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlacesScreen;
