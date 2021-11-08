import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import Loader from "../UI/Loader";
import Message from "../UI/Message";

import { baseURL } from "../../constants/baseURL";

const TablePaginationActions = (props) => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const theme = useTheme();

  const firstPageButtonClickHandler = (event) => {
    onPageChange(event, 0);
  };

  const backButtonClickHandler = (event) => {
    onPageChange(event, page - 1);
  };

  const nextButtonClickHandler = (event) => {
    onPageChange(event, page + 1);
  };

  const lastPageButtonClickHandler = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={firstPageButtonClickHandler}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={backButtonClickHandler}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRightIcon />
        ) : (
          <KeyboardArrowLeftIcon />
        )}
      </IconButton>
      <IconButton
        onClick={nextButtonClickHandler}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeftIcon />
        ) : (
          <KeyboardArrowRightIcon />
        )}
      </IconButton>
      <IconButton
        onClick={lastPageButtonClickHandler}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const PlacesTable = (props) => {
  const { history } = props;

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [places, setPlaces] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setLoading(true);
      axios
        .get(
          `${baseURL}/api/places?pagenumber=${
            pageNumber + 1
          }&pagesize=${pageSize}`
        )
        .then((response) => {
          setPlaces(response.data.places);
          setTotalDocuments(response.data.totalDocuments);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [dispatch, userInfo, pageNumber, pageSize, history]);

  const changePageHandler = (event, newPage) => {
    setLoading(true);
    setPageNumber(newPage);
    axios
      .get(
        `${baseURL}/api/places?pagenumber=${newPage + 1}&pagesize=${pageSize}`
      )
      .then((response) => {
        setPlaces(response.data.places);
        setTotalDocuments(response.data.totalDocuments);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  };

  const changeRowsPerPageHandler = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        {loading ? (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Loader />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table> ? (
            error
          ) : (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Message severity="error">{error}</Message>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )
        ) : (
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
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={totalDocuments}
                  page={pageNumber}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "row per page",
                    },
                    native: true,
                  }}
                  rowsPerPage={pageSize}
                  onPageChange={changePageHandler}
                  onRowsPerPageChange={changeRowsPerPageHandler}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </TableContainer>
    </Fragment>
  );
};

export default PlacesTable;
