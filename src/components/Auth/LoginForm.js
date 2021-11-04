import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Message from "../../components/UI/Message";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const LoginForm = (props) => {
  const { login, loading, error } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "second.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          App de Lugares Turísticos de Tungurahua - Admin
        </Typography>
        {error && <Message severity="error">{error}</Message>}
        <Box component="form" sx={{ mt: 1 }} onSubmit={submitHandler}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="mail"
            label="Correo electrónico"
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Contraseña"
            type="password"
            name="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoadingButton
            type="submit"
            loading={loading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesion
          </LoadingButton>
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button> */}
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginForm;
