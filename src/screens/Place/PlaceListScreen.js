import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import PlacesTable from "../../components/Place/PlacesTable";

import { getPlacesList } from "../../store/actions/place";

const PlaceListScreen = (props) => {
  const { history, match } = props;

  const pagenumber = match.params.pagenumber || 1;
  const pagesize = match.params.pagesize || 5;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const placesList = useSelector((state) => state.placesList);
  const { loading, places, pageNumber, pageSize, totalDocuments, error } =
    placesList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(getPlacesList(pagenumber, pagesize));
    }
  }, [dispatch, userInfo, history, pagenumber, pagesize]);

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
            <PlacesTable
              loading={loading}
              places={places}
              pageNumber={pageNumber}
              pageSize={pageSize}
              totalDocuments={totalDocuments}
              error={error}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceListScreen;
