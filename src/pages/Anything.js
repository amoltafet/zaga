import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Input from "@mui/joy/Input";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import Alert from "@mui/joy/Alert";
import MenuBar from "../components/MenuBar";
import GeneratePrompts from "../util/GeneratePrompts.js";
import Chip from "@mui/joy/Chip";
import Sun from "@mui/icons-material/LightMode";
import HttpIcon from "@mui/icons-material/Http";
import SurfingOutlinedIcon from "@mui/icons-material/SurfingOutlined";
import CircularProgress from "@mui/joy/CircularProgress";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

function Anything() {
  const [data, setData] = useState([]);
  const [waiting, setWaiting] = useState(false);

  const clearData = () => {
    setData([]);
    setWaiting(false);
    document.getElementById("input").value = "";
  };

  // on enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addData();
    }
  };

  const ButtonStyle = () => {
    if (waiting) {
      return (
        <Button
          disabled
          sx={{
            marginBottom: "1%",
            marginLeft: "20%",
            marginRight: "20%",
          }}
        >
          <CircularProgress size="sm" />
        </Button>
      );
    } else {
      return (
        <Button
          color="primary"
          onClick={addData}
          sx={{
            marginBottom: "1%",
            marginLeft: "20%",
            marginRight: "20%",
          }}
        >
          Send
        </Button>
      );
    }
  };

  const addData = async () => {
    // get value by id
    let value = document.getElementById("input").value;
    document.getElementById("input").value = "";
    if (value === "") {
      return;
    }
    setData([...data, { user_input: value, chatgpt_response: "" }]);
    setWaiting(true);
    setTimeout(() => {
      var objDiv = document.getElementById("outputBox");
      objDiv.scrollTo(0, objDiv.scrollHeight, { behavior: "smooth" });
    }, 0);
    const prompts = await GeneratePrompts(value, "chat");
    const apiResponse = prompts;
    // update data
    setData([...data, { user_input: value, chatgpt_response: apiResponse }]);
    setWaiting(false);
    // scroll to bottom
    setTimeout(() => {
      var objDiv = document.getElementById("outputBox");
      objDiv.scrollTo(0, objDiv.scrollHeight, { behavior: "smooth" });
    }, 0);
  };

  const mapData = () => {
    if (data.length === 0) {
      return (
        <div style={{ textAlign: "center" }}>
          <Typography
            variant="outlined"
            sx={{
              marginBottom: "20%",
              marginTop: "20%",
            }}
          >
            No conversations yet. Start one by typing in the box below.
          </Typography>
        </div>
      );
    } else {
      return data.map((item, index) => {
        return (
          <>
            <Alert
              variant="outlined"
              key={index}
              sx={{
                marginBottom: "1%",
                marginLeft: "20%",
              }}
            >
              {item.user_input}
            </Alert>
            {item.chatgpt_response === "" ? (
              <></>
            ) : (
              <Alert
                key={index}
                sx={{
                  marginBottom: "1%",
                  marginRight: "20%",
                }}
                endDecorator={
                  <React.Fragment>
                    <Chip
                      color="danger"
                      variant="plain"
                      startDecorator={<ThumbDownAltOutlinedIcon />}
                      onClick={() => alert("You clicked the  button!")}
                      sx={{
                        marginLeft: "1%",
                      }}
                    ></Chip>
                    <Chip
                      color="success"
                      variant="plain"
                      startDecorator={<ThumbUpAltOutlinedIcon />}
                      onClick={() => alert("You clicked the  button!")}
                      sx={{
                        marginLeft: "1%",
                      }}
                    ></Chip>
                  </React.Fragment>
                }
              >
                {item.chatgpt_response}
              </Alert>
            )}
          </>
        );
      });
    }
  };

  let BoxHeight = window.innerHeight * 0.7;

  const handleChipClick = (text) => {
    console.log(text);
    // set value by id
    document.getElementById("input").value = text;
    addData();
    text = "";
  };

  return (
    <div>
      <MenuBar />
      <div
        style={{
          marginTop: "5%",
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              padding: "8px",
            }}
          >
            <Tooltip title="Restart">
              <IconButton onClick={clearData}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>

            <Box
              sx={{
                paddingTop: "2%",
                maxHeight: BoxHeight,
                height: BoxHeight,
                overflow: "scroll",
                overflowX: "hidden",
                // hide scrollbar
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              id="outputBox"
            >
              {mapData()}
            </Box>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          width: "80%",
          marginLeft: "10%",
          marginRight: "10%",
          marginBottom: "5%",
        }}
      >
        {data.length === 0 ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1%",
                overflowY: "hidden",
                overflowX: "scroll",
              }}
            >
              <Chip
                variant="outlined"
                startDecorator={<HttpIcon />}
                onClick={() => {
                  handleChipClick("How to create a HTTP request in React?");
                }}
                sx={{ marginBottom: "1%" }}
              >
                How to create a HTTP request in React?
              </Chip>
              <Chip
                variant="outlined"
                startDecorator={<Sun />}
                onClick={() => {
                  handleChipClick("Why is the sky light blue?");
                }}
                sx={{ marginBottom: "1%" }}
              >
                Why is the sky light blue?
              </Chip>
              <Chip
                variant="outlined"
                startDecorator={<SurfingOutlinedIcon />}
                onClick={() => {
                  handleChipClick(
                    "Does the sun move around because of the earth?"
                  );
                }}
                sx={{ marginBottom: "1%" }}
              >
                Can I go surfing in the winter in California?
              </Chip>
            </div>
          </div>
        ) : (
          <></>
        )}
        <Input
          startDecorator={<TextFieldsIcon />}
          endDecorator={ButtonStyle()}
          id="input"
          placeholder="Type something..."
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default Anything;
