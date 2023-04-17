import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import MenuBar from "../components/MenuBar";
import Button from "@mui/joy/Button";
import { Grid } from "@mui/material";

export default function Projects() {
  const [user, setUser] = React.useState(null);

  let numOverflowCards = 5;
  return (
    <div
      style={{
        marginTop: "5%",
        marginLeft: "20%",
        marginRight: "20%",
      }}
    >
      <MenuBar />
      <Typography variant="h1" sx={{ fontSize: "h1", mt: 2 }}>
        Projects
      </Typography>
      <Grid container spacing={2}>
        {Array.from(Array(numOverflowCards).keys()).map((_, index) => (
          <Grid item xs={4}>
            <OverflowCard />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function OverflowCard() {
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
        My Table Project
      </Typography>
      <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
        A table project that I made for my family
      </Typography>
      <Divider />
      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          gap: 1.5,
          py: 1.5,
          px: "var(--Card-padding)",
          bgcolor: "background.level1",
        }}
      >
        <Button variant="outlined" size="sm">
          View
        </Button>
        <Divider orientation="vertical" />
        <Typography
          level="body2"
          sx={{ fontWeight: "md", color: "text.secondary", marginTop: "1%" }}
        >
          1 hour ago
        </Typography>
      </CardOverflow>
    </Card>
  );
}
