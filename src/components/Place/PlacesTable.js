import React, { Fragment } from "react";

import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Loader from "../UI/Loader";
import Message from "../UI/Message";

const PlacesTable = (props) => {
  const { loading, places, pageNumber, pageSize, totalDocuments, error } =
    props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Fecha de creación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell>
                <Loader />
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell>
                <Message severity="error">{error}</Message>
              </TableCell>
            </TableRow>
          ) : (
            <Fragment>
              {places.map((place) => {
                return (
                  <TableRow key={place._id}>
                    <TableCell>{place.name}</TableCell>
                    <TableCell>{place.description}</TableCell>
                    <TableCell>{place.address}</TableCell>
                    <TableCell>{place.createdAt}</TableCell>
                  </TableRow>
                );
              })}
            </Fragment>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlacesTable;
