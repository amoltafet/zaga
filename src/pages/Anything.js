import React, { useEffect, useState } from "react";
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
import Generate from "./Generate";
import pageInfo from "../context";
// recieve the variables from the Generate component
export default function Anything() {
  const [data, setData] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  const [show, setShow] = useState(false);
  // create a box object that has an array of objects and title
  const [boxOne, setBoxOne] = useState({
    title: "",
    array: [],
  });

  const [boxTwo, setBoxTwo] = useState({
    title: "",
    array: [],
  });

  const url = window.location.href;

  useEffect(() => {
    // get the last part of the url
    const lastPart = url.substring(url.lastIndexOf("/") + 1);
    setPageTitle(lastPart);
    // if last part is not 'anything' then show the generate component
    if (lastPart !== "anything") {
      setShow(true);
      // set the boxOne and boxTwo titles
      setBoxOne({ ...boxOne, title: pageInfo.find((page) => page.title === lastPart).boxOneTitle });
      setBoxTwo({ ...boxTwo, title: pageInfo.find((page) => page.title === lastPart).boxTwoTitle });
    } else {
      setShow(false);
    }
  }, [url]);

  const clearData = () => {
    setData([]);
    setWaiting(false);
    document.getElementById("input").value = "";
    setBoxOne({ ...boxOne, array: [] });
    setBoxTwo({ ...boxTwo, array: [] });
  };

  const displayPage = () => {
    if (pageTitle === "generate") {
      return <Generate boxOne={boxOne} boxTwo={boxTwo} />;
    } else if (pageTitle === "writer") {
      return <Generate boxOne={boxOne} boxTwo={boxTwo} />;
    } else if (pageTitle === "brainstorm") {
      return <Generate boxOne={boxOne} boxTwo={boxTwo} />;
    } else if (pageTitle === "search") {
      return <Generate boxOne={boxOne} boxTwo={boxTwo} />;
    } else {
      return <></>;
    }
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
    const prompts = await GeneratePrompts(value, "anything");
    const apiResponse = prompts;
    // update data
    setData([...data, { user_input: value, chatgpt_response: apiResponse }]);

    // get updates for boxOne and boxTwo
    const boxOnePrompt = await GeneratePrompts(value, pageTitle);
    const boxTwoPrompt = await GeneratePrompts(apiResponse, pageTitle);
    // add it to array
    // remove whitespace before the text
    setBoxOne({ ...boxOne, array: [...boxOne.array, boxOnePrompt] });
    setBoxTwo({ ...boxTwo, array: [...boxTwo.array, boxTwoPrompt] });

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
                // make the key unique
                key={index + 999999}
                sx={{
                  marginBottom: "1%",
                  marginRight: "20%",
                  whiteSpace: "pre-wrap",
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
          marginLeft: "4%",
          marginRight: "4%",
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={show ? 8 : 12} sx={{ padding: "8px", marginTop: "1%" }}>
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
            {data.length === 0 ? (
              <div
                style={{
                  width: "100%",
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
          </Grid>
          {show ? (
            <Grid xs={4} sx={{ padding: "8px" }}>
             {displayPage()}
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </div>
    </div>
  );
}
