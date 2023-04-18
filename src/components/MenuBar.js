import React, { useEffect } from "react";
import { AppBar, CssBaseline, Typography } from "@mui/material";

import Button from "@mui/joy/Button";
import Drawer from "@mui/material/Drawer";
import Popover from "@mui/material/Popover";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Settings from "./Settings";
import Notifications from "./Notifications";
import Profile from "./Profile";

export default function MenuBar() {
  const [settings, setSettings] = React.useState({ right: false });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorNotif, setAnchorNotif] = React.useState(null);
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    // sessionStorage.setItem("user", JSON.stringify({name: "John Doe", email: "
    const user = sessionStorage.getItem("user");
    setUser(user);
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSettings({ ...settings, [anchor]: open });
  };

  // profile
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // notifications
  const handleNotificationClick = (event) => {
    setAnchorNotif(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorNotif(null);
  };

  const openNotification = Boolean(anchorNotif);
  const idNotification = openNotification ? "notification" : undefined;

  const backBtn = () => {
    window.history.back();
  };

  const backBtnDisplay = () => {
    if (window.location.pathname === "/") {
      return <> </>;
    } else {
      return (
        <div
          style={{
            position: "absolute",
            left: "3%",
            marginTop: "1%",
          }}
        >
          <Button
            aria-label="Like"
            variant="outlined"
            color="neutral"
            sx={{ marginRight: "5px" }}
            onClick={backBtn}
          >
            {" "}
            <KeyboardArrowLeftIcon fontSize="small" /> Back
          </Button>
        </div>
      );
    }
  };

  return (
    <AppBar>
      <CssBaseline />
      {backBtnDisplay()}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, 0%)",
          marginTop: "1%",
        }}
      >
        {user ? (
          <Typography variant="h6">{user}</Typography>
        ) : (
          <Typography
            variant="overline"
            sx={{ flexGrow: 1, textAlign: "center", color: "black" }}
          >
            Create an account to save your progress!
          </Typography>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          right: "3%",
          marginTop: "1%",
        }}
      >
        <Button
          aria-describedby={id}
          variant="outlined"
          color="neutral"
          sx={{ marginRight: "5px" }}
          onClick={handleClick}
        >
          <AccountCircleOutlinedIcon />
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            marginTop: "10px",
          }}
        >
          <Profile />
        </Popover>
        <Button
          variant="outlined"
          color="neutral"
          sx={{ marginRight: "5px" }}
          aria-describedby={idNotification}
          onClick={handleNotificationClick}
        >
          <NotificationsNoneOutlinedIcon />
        </Button>
        <Popover
          id={idNotification}
          open={openNotification}
          anchorEl={anchorNotif}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            marginTop: "10px",
          }}
        >
          <Notifications />
        </Popover>
        <Button
          aria-label="Like"
          variant="outlined"
          color="neutral"
          onClick={toggleDrawer("right", true)}
        >
          <SettingsOutlinedIcon />
        </Button>
      </div>
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Drawer
              anchor={anchor}
              open={settings[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {<Settings toggleDrawer={toggleDrawer} anchor={anchor} />}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </AppBar>
  );
}
