import React from "react";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import PlacesTable from "../../components/Place/PlacesTable";

const PlaceListScreen = (props) => {
  const { match, history } = props;
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Grid item sx={{ mb: 4 }}>
              <Button
                variant="contained"
                component={Link}
                to="/dashboard/place/create"
              >
                Nuevo lugar
              </Button>
            </Grid>
            <PlacesTable match={match} history={history} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceListScreen;
