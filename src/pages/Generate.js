import { Box, Divider, Tooltip, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import React, { useEffect } from "react";
import pageInfo from "../context";
import { useState } from "react";
import LinearProgress from "@mui/joy/LinearProgress";

export default function Generate({ boxOne, boxTwo }) {
  let BoxHeight = window.innerHeight / 3;

  let [page, setPage] = useState([]);

  let url = window.location.href;
  const lastPart = url.substring(url.lastIndexOf("/") + 1);
  let pageIn = pageInfo.find((pageTemp) => pageTemp.title === lastPart);

  useEffect(() => {
    setPage(pageIn);
  }, []);

  return (
    <Grid
      xs={4}
      sx={{
        marginTop: "6%",
        padding: "2%",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1%" }}>
        <Typography variant="overline" component="div">
          {page.title} Tools
        </Typography>
      </div>
      <Box
        sx={{
          border: "0.5px solid black",
          borderRadius: "5px",
          padding: "10px",
          maxHeight: BoxHeight,
          minHeight: BoxHeight,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="overline" sx={{ textAlign: "center" }}>
            {page.boxOneTitle}{" "}
          </Typography>
          <Tooltip title={page.boxOneDescription}>
            <ErrorOutlineOutlinedIcon fontSize="small" />
          </Tooltip>
        </div>
        <Divider sx={{ marginTop: "1%" }} />
        {boxOne.loading && <LinearProgress thickness={1} />}
        <div
          style={{
            maxHeight: BoxHeight - 50,
            overflow: "scroll",
            overflowX: "hidden",
          }}
        >
          {boxOne.array.map((item, index) => (
            <React.Fragment key={index}>
              <Typography
                variant="body2"
                sx={{
                  marginTop: "1%",
                  marginBottom: "1%",
                  marginLeft: "2%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {item}
              </Typography>
            </React.Fragment>
          ))}
        </div>
      </Box>

      <Box
        sx={{
          border: "0.5px solid black",
          borderRadius: "5px",
          padding: "10px",
          maxHeight: BoxHeight,
          minHeight: BoxHeight,
          marginTop: "5%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="overline"
            sx={{ textAlign: "center", marginTop: "1%" }}
          >
            {page.boxTwoTitle}{" "}
          </Typography>
          <Tooltip title={page.boxTwoDescription}>
            <ErrorOutlineOutlinedIcon fontSize="small" />
          </Tooltip>
        </div>
        <Divider sx={{ marginTop: "1%" }} />
        {boxTwo.loading && <LinearProgress thickness={1} />}
        <div
          style={{
            maxHeight: BoxHeight - 50,
            overflow: "scroll",
            overflowX: "hidden",
          }}
        >
          {boxTwo.array.map((item, index) => (
            <React.Fragment key={index}>
              <Typography
                variant="body2"
                sx={{
                  marginTop: "1%",
                  marginBottom: "1%",
                  marginLeft: "2%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {item}
              </Typography>
            </React.Fragment>
          ))}
        </div>
      </Box>
      <Button variant="outlined" sx={{ marginTop: "5%" }} fullWidth>
        Save to Projects
      </Button>
    </Grid>
  );
}
