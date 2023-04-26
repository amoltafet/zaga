import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { getAuth } from "firebase/auth";

export default function Profile() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    setUser(getAuth().currentUser);
  }, []);

  const Logout = () => {
    getAuth().signOut();
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <div>
      {user ? (
        <>
      <Typography variant="overline"  sx={{ flexGrow: 1, p: 1 }}>
          Profile
        </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              sx={{ width: 100, height: 100, flexShrink: 0, flexGrow: 0, alignSelf: "center" }}
              src="/static/images/cards/live-from-space.jpg"
            />
            <Typography sx={{ alignSelf: "center", marginLeft: "10px" }}>
              {user.displayName}
            </Typography>
          </div>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, textAlign: "center" }}>
              <CardContent sx={{ flex: "1 0 auto", overflow: "hidden" }}>
                <Typography component="div" variant="h5">
                  {user.displayName}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {user.email}
                </Typography>
              </CardContent>
            </Box>
        

          <Box sx={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={() => {
                window.location.href = "/projects";
              }}
            >
              My Projects
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: "10px" }}
              onClick={Logout}
            >
              Logout
            </Button>
          </Box>
        </>
      ) : (
        <div>
          <Typography variant="overline" sx={{ p: 2 }}>
            Please login to view your profile
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            sx={{ marginLeft: "3px" }}
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
}
