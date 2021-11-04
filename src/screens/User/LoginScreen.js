import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import { login } from "../../store/actions/user";

import LoginImage from "../../components/Auth/LoginImage";
import LoginForm from "../../components/Auth/LoginForm";

const LoginScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  if (userInfo) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <LoginImage />
      <LoginForm login={login} loading={loading} error={error} />
    </Grid>
  );
};

export default LoginScreen;
