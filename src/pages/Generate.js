import { Box, Divider, Tooltip, Typography } from "@mui/material";
import Anything from "./Anything";
import Grid from "@mui/material/Unstable_Grid2";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
<<<<<<< HEAD
import React from "react";
=======
import { useEffect, useState } from "react";
import React from "react";
import GeneratePrompts from "../util/GeneratePrompts.js";
>>>>>>> 25121e1755828e23923ea06a04a8d2900c5f17df

function Generate() {
  let BoxHeight = window.innerHeight / 3;
  const [data, setData] = useState([]);

  const getData = async () => {
    const prompts = await GeneratePrompts("", "code");
    const apiResponse = prompts;
    // update data
    setData([...data, apiResponse]);
    
  };
  useEffect (() => {
    
    //
    getData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, marginTop: "2%" }}>
      <Grid container spacing={1}>
        <Grid xs={8}>
       <Anything />
        </Grid>
        <Grid
          xs={4}
          sx={{
            marginTop: "6%",
            padding: "2%",
          }}
        >
          <Box
            sx={{
              border: "0.5px solid black",
              borderRadius: "5px",
              padding: "10px",
              minHeight: BoxHeight,
            }}
          >
            <Typography variant="overline" sx={{ textAlign: "center" }}>
              Variables{" "}
              <Tooltip title="Variables are the things that you want to change in your code or the things that you want to use in your code.">
              <ErrorOutlineOutlinedIcon
                fontSize="small"
                sx={{
                  position: "relative",
                  left: "75%",
                  top: "0%",
                }}
              />
              </Tooltip>
            </Typography>
            <Divider sx={{ marginTop: "1%" }} />
            {data.map((item , index) => (
               <React.Fragment key={index}>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: "1%",
                    marginBottom: "1%",
                    marginLeft: "2%",
                  }}
                >
                  {item}
                </Typography>
              </React.Fragment>
            ))
            
            }
          </Box>

          <Box
            sx={{
              border: "0.5px solid black",
              borderRadius: "5px",
              padding: "10px",
              minHeight: BoxHeight,
              marginTop: "5%",
            }}
          >
            <Typography
              variant="overline"
              sx={{ textAlign: "center", marginTop: "1%" }}
            >
              Descriptions{" "}
              <Tooltip title="Descriptions are the things that describe your code and it functions.">
              <ErrorOutlineOutlinedIcon
                fontSize="small"
                sx={{
                  position: "relative",
                  left: "70%",
                  top: "0%",
                }}
              />
              </Tooltip>
            </Typography>
            <Divider sx={{ marginTop: "1%" }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Generate;
