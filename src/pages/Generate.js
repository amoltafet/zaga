import { Box } from "@mui/material";
import Anything from "./Anything";
import Grid from '@mui/material/Unstable_Grid2';

function Generate() {

  return (
    <div className="">
       <Grid container spacing={1}>
          
          <Grid xs={12} sm={8} md={8} lg={8}>
            <Anything />
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3}>

          </Grid>
         
        </Grid>
    </div>
  );
}

export default Generate;
