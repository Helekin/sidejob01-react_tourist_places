import React from "react";
import Grid from "@mui/material/Grid";

import loginImage from "../../assets/img/login-image.jpg";

const LoginImage = () => {
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: `url(${loginImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
      }}
    />
  );
};

export default LoginImage;
