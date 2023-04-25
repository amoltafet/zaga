import { Box, Divider, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import React, { useEffect } from "react";
import pageInfo from "../context";
import { useState } from "react";

export default function Generate({boxOne, boxTwo}) {
  let BoxHeight = window.innerHeight / 3;

  let [page, setPage] = useState([]);

  let url = window.location.href;
  const lastPart = url.substring(url.lastIndexOf("/") + 1);
  let pageIn = pageInfo.find((pageTemp) => pageTemp.title === lastPart);
  useEffect(() => {
    setPage(pageIn);
    console.log(pageIn);

  }, []);

  return (
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
          {page.boxOneTitle}{" "}
          <Tooltip title={page.boxOneDescription}>
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
        {boxOne.array.map((item, index) => (
          <React.Fragment key={index}>
            <Typography
              variant="body2"
              sx={{
                marginTop: "1%",
                marginBottom: "1%",
                marginLeft: "2%",
                whiteSpace: "pre-wrap"
              }}
            >
              {item}
            </Typography>
          </React.Fragment>
            ))}
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
          {page.boxTwoTitle}{" "}
          <Tooltip title={page.boxTwoDescription}>
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
  );
}

