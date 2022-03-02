import { FC } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar: FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ color: "#fff", fontFamily: "Katuri !important", fontSize: 24 }}
        >
          Modrak
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
