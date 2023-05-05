import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import ButtonJoy from "@mui/joy/Button";
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
import MicNoneIcon from "@mui/icons-material/MicNone";
import CampaignIcon from "@mui/icons-material/Campaign";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function Anything() {
  const [data, setData] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  const [show, setShow] = useState(false);
  // create a box object that has an array of objects and title
  const [boxOne, setBoxOne] = useState({
    title: "",
    array: [],
    loading: false,
  });

  const [boxTwo, setBoxTwo] = useState({
    title: "",
    array: [],
    loading: false,
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
      setBoxOne({
        ...boxOne,
        title: pageInfo.find((page) => page.title === lastPart).boxOneTitle,
      });
      setBoxTwo({
        ...boxTwo,
        title: pageInfo.find((page) => page.title === lastPart).boxTwoTitle,
      });
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
    setBoxOne({ ...boxOne, loading: true });
    setBoxTwo({ ...boxTwo, loading: true });

    setData([...data, { user_input: value, chatgpt_response: "" }]);
    setWaiting(true);
    setTimeout(() => {
      var objDiv = document.getElementById("outputBox");
      objDiv.scrollTo(0, objDiv.scrollHeight, { behavior: "smooth" });
    }, 0);
    let prompts = await GeneratePrompts(value, "anything");
    // remove white space from the beginning of the string
    prompts = prompts.replace(/^\s+/g, "");
    // update data
    setData([...data, { user_input: value, chatgpt_response: prompts }]);
    setWaiting(false);

    // get updates for boxOne and boxTwo
    let boxOnePrompt = await GeneratePrompts("BoxOne", pageTitle);
    boxOnePrompt = boxOnePrompt.replace(/^\s+/g, "");
    setBoxOne({
      ...boxOne,
      array: [...boxOne.array, boxOnePrompt],
      loading: false,
    });
    let boxTwoPrompt = await GeneratePrompts("BoxTwo", pageTitle);
    boxTwoPrompt = boxTwoPrompt.replace(/^\s+/g, "");
    setBoxTwo({
      ...boxTwo,
      array: [...boxTwo.array, boxTwoPrompt],
      loading: false,
    });

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
                marginTop: "1%",
                marginLeft: "20%",
              }}
            >
              {item.user_input}
            </Alert>
            {item.chatgpt_response === "" ? (
              <></>
            ) : (
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Chip
                    color="primary"
                    variant="outlined"
                    startDecorator={<CampaignIcon fontSize="small" />}
                    onClick={() => alert("You clicked the  button!")}
                    sx={{
                      marginBottom: "0.5%",
                    }}
                  />
                  <div
                    style={{
                      marginRight: "20%",
                    }}
                  >
                    <Tooltip title="Previous">
                      <ButtonJoy
                        color="primary"
                        variant="soft"
                        onClick={() => alert("You clicked the  button!")}
                        sx={{ borderRadius: 0 }}
                        size="small"
                      >
                        <KeyboardArrowLeftIcon />
                      </ButtonJoy>
                    </Tooltip>
                    <Tooltip title="Next">
                      <ButtonJoy
                        color="primary"
                        variant="soft"
                        onClick={() => alert("You clicked the  button!")}
                        sx={{ borderRadius: 0 }}
                        size="small"
                      >
                        <KeyboardArrowRightIcon />
                      </ButtonJoy>
                    </Tooltip>
                  </div>
                </div>
                <Alert
                  // make the key unique
                  key={index + 999999}
                  sx={{
                    marginBottom: "1%",
                    marginRight: "20%",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {item.chatgpt_response}
                </Alert>

                <div>
                  <Typography variant="overline" sx={{ marginLeft: "1%" }}>
                    Did you like this response?
                  </Typography>
                  <Chip
                    color="success"
                    variant="outlined"
                    startDecorator={<ThumbUpAltOutlinedIcon fontSize="small" />}
                    onClick={() => alert("You clicked the  button!")}
                    sx={{
                      marginLeft: "1%",
                      marginRight: "1%",
                    }}
                  />
                  <Chip
                    color="danger"
                    variant="outlined"
                    startDecorator={
                      <ThumbDownAltOutlinedIcon fontSize="small" />
                    }
                    onClick={() => alert("You clicked the  button!")}
                  />
                </div>
              </>
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
          marginLeft: "4%",
          marginRight: "2%",
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={show ? 8 : 12} sx={{ padding: "8px", marginTop: "1%" }}>
            <Tooltip title="Restart">
              <IconButton onClick={clearData} variant="outlined">
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
              startDecorator={
                <IconButton variant="outlined">
                  <MicNoneIcon />
                </IconButton>
              }
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
