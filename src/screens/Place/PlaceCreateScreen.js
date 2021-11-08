import React from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import PlaceCreateForm from "../../components/Place/PlaceCreateForm";

const PlaceCreateScreen = () => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <PlaceCreateForm />
      </Paper>
    </Container>
  );
};

export default PlaceCreateScreen;
