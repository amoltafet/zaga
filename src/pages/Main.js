import { Button, Grid } from "@mui/material";
import MediaCard from "../components/CardNav";
import ThumbUp from "@mui/icons-material/ThumbUp";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import MenuBar from "../components/MenuBar";
import React from "react";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { AspectRatio } from "@mui/joy";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";

const images = require.context("../images", true);
function Main() {
  const pages = [
    {
      title: "Essay Generator",
      logo: "./writing.jpeg",
      link: "/writer",
      describe: "Generate any text based on a prompt",
      example: "Write me a story about a dog",
    },
    {
      title: "Generate Code",
      logo: "./code.jpeg",
      link: "/generate",
      describe: "Generate code based on a prompt",
      example: "Generate http code for a website",
    },
    {
      title: "Brainstorm Ideas",
      logo: "./brainstorm.jpeg",
      link: "/brainstorm",
      describe: "Generate ideas based on a prompt",
      example: "Generate ideas for a new business",
    },
    {
      title: "Do Anything",
      logo: "./ideas.jpeg",
      link: "/anything",
      describe: "Generate anything based on a prompt",
      example: "What is the meaning of life?",
    },
    {
      title: "Search the Web",
      logo: "./search.jpeg",
      link: "/search",
      describe: "Search for anything based on a prompt",
      example: "Where is the nearest coffee shop?",
    },
    {
      title: "Help Center",
      logo: "./help.jpeg",
      link: "/help",
      describe: "Learn how to use this website",
      example: "Where do I change my password?",
    },
  ];


   // grab the event listener for dark mode
  if (localStorage.getItem("darkMode")) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  return (
    <div>
      <MenuBar />

      <div
        style={{
          marginTop: "10%",
          position: "absolute",
          left: "10%",
          right: "10%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card
              orientation="horizontal"
              variant="outlined"
              sx={{ width: "100%", bgcolor: "background.body" }}
            >
              <CardOverflow>
                <AspectRatio ratio="1" sx={{ width: 100 }}>
                  <Link href="/projects">
                    <img
                      src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                      srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                      loading="lazy"
                      alt=""
                    />
                  </Link>
                </AspectRatio>
              </CardOverflow>
              <CardContent sx={{ px: 2 }}>
                <Typography
                  fontWeight="md"
                  textColor="success.plainColor"
                  mb={0.5}
                  fontSize={["md", "xl"]}
                >
                  {" "}
                  <Link href="/projects">My Projects</Link>
                </Typography>
                <Typography level="body2"> 0 Saved Projects</Typography>
              </CardContent>
              <Divider />
              <CardOverflow
                variant="soft"
                color="primary"
                sx={{
                  px: 0.2,
                  writingMode: "vertical-rl",
                  textAlign: "center",
                  fontSize: "xs2",
                  fontWeight: "xl2",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
                onClick={() => {
                  window.location.href = "/projects";
                }}
              >
                View All
              </CardOverflow>
            </Card>
          </Grid>
          {pages.map((page) => (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <MediaCard props={page} />
            </Grid>
          ))}
        </Grid>
       
        <Button
          variant="outlined"
          sx={{ marginTop: "2rem", marginLeft: "5px" }}
        >
          <QuestionMarkIcon />
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginTop: "2rem", marginLeft: "5px" }}
        >
          <ThumbUp />
        </Button>
      </div>
    </div>
  );
}

export default Main;
