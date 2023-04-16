import { Box } from "@mui/material";
import Anything from "./Anything";
import Grid from '@mui/material/Grid';

function Generate() {

  return (
    <div className="">
       <Grid container spacing={2}>
          <Grid item xs={8}>
            <Anything />
          </Grid>
          <Grid item xs={2}>

          </Grid>
        </Grid>
    </div>
  );
}

export default Generate;
