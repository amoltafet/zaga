import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
} from "@mui/material";

import Button from '@mui/joy/Button';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


function MenuBar() {

  return (
    <AppBar >
      <CssBaseline />
          <div style={{
            position: "absolute",
            right: "3%",
            marginTop: "1%",
          }}>
          
          <Button aria-label="Like" variant="outlined" color="neutral" sx={{marginRight: "5px"}}>
            <AccountCircleOutlinedIcon />
          </Button>
          <Button aria-label="Like" variant="outlined" color="neutral" sx={{marginRight: "5px"}}>
            <NotificationsNoneOutlinedIcon />
          </Button>
          <Button aria-label="Like" variant="outlined" color="neutral">
            <SettingsOutlinedIcon />
          </Button>
           
          </div>
    </AppBar>
  );
}
export default MenuBar;
