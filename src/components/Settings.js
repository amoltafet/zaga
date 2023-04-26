import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from '@mui/joy/Button';


import Switch from "@mui/joy/Switch";
import Profile from "./Profile";

export default function Settings({ toggleDrawer, anchor }) {
  const [checked, setChecked] = React.useState(false);
  const [dataPrivacy, setDataPrivacy] = React.useState(true);



  return (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 300,
        padding: 2,
      }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Profile />
      <Divider sx={{ mt: 2, mb: 2 }} />

      <Typography variant="overline"  sx={{ flexGrow: 1, p: 1 }}>
        Settings
      </Typography>

      <FormControl
        orientation="horizontal"
        sx={{ width: "100%", justifyContent: "space-between" }}
      >
        <Box sx={{padding: 1}}>
          <FormLabel>Dark Mode</FormLabel>
          <FormHelperText sx={{ mt: 0 }}>Disabled by default.</FormHelperText>
        </Box>
        <Switch
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          color={checked ? "success" : "neutral"}
          variant="outlined"
          endDecorator={checked ? "On" : "Off"}
          slotProps={{
            endDecorator: {
              sx: {
                minWidth: 24,
              },
            },
          }}
        />
      </FormControl>

      <FormControl
        orientation="horizontal"
        sx={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{padding: 1}}>
          <FormLabel>Data Privacy</FormLabel>
          <FormHelperText >Enabled by default.</FormHelperText>
        </Box>
        <Switch
          checked={dataPrivacy}
          onChange={(event) => setDataPrivacy(event.target.checked)}
          color={dataPrivacy ? "success" : "neutral"}
          variant="outlined"
          endDecorator={dataPrivacy ? "On" : "Off"}
          slotProps={{
            endDecorator: {
              sx: {
                minWidth: 24,
              },
            },
          }}
        />
      </FormControl>

      <Button variant="outlined"  color="success" onClick={function(){}} fullWidth sx={{
          marginBottom: "10px",
          marginTop: "10px"
        }}>Download Data</Button>

        

      <Box sx={{ flexGrow: 1 }} >
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant="overline"  sx={{  p: 1}}>
          Project Settings
        </Typography>
        <Button variant="outlined"  color="success" onClick={function(){}} fullWidth sx={{
          marginBottom: "10px",
          marginTop: "10px"
        }}>Download Projects</Button>
        <Button variant="outlined"  color="danger" onClick={function(){}} fullWidth>Clear Projects</Button>
      </Box>

    
    </Box>
  );
}
