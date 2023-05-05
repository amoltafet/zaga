import React, { useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Button from "@mui/joy/Button";
import Drawer from "@mui/material/Drawer";
import Popover from "@mui/material/Popover";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Settings from "./Settings";
import Notifications from "./Notifications";
import { Avatar, Link } from "@mui/joy";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Tooltip from "@mui/joy/Tooltip";



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
        >
           <Button
            aria-label="Like"
            variant="outlined"
            color="neutral"
            sx={{ marginRight: "50px" }}
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
    <>
      <CssBaseline />

     <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" 
        sx={{ backgroundColor: "transparent", padding: "10px", marginBottom: "10px", 
        boxShadow: "none", borderBottom: "1px solid #E0E0E0"
      }}
      >
        <Toolbar>
          <Link href="/">
          <Avatar src={require("../images/logo.png")} alt="logo" 
              sx={{ width: 50, height: 50, flexShrink: 0, flexGrow: 0, alignSelf: "center" }}
          />  </Link>
          <Typography variant="overline"  sx={{ flexGrow: 1, color: "#427FF6", fontSize:
          "1.5rem", fontWeight: "bold", marginLeft: "10px"
        }}>
            ZAG AI
          </Typography>
         
         
          <Button
              aria-label="Like"
              variant="outlined"
              color="neutral"
              onClick={toggleDrawer("right", true)}
            >
              <AccountCircleOutlinedIcon />
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              sx={{ marginRight: "5px", marginLeft: "5px" }}
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
        </Toolbar>
      </AppBar>
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
    </Box>
     
    </>
  );
}
