import { Button, Grid, Typography } from "@mui/material";
import MediaCard from "../components/CardNav";
import "../styles/Main.css";
const images = require.context("../images", true);


function Main() {

    const pages = [
        {
            title: "Writer",
            logo: "./writing.jpeg",
            link: "/writer",
        },
        {
            title: "Generate",
            logo: './code.jpeg',
            link: "/generate",
        },
        {
            title: "Brainstorm",
            logo: './brainstorm.jpeg',
            link: "/brainstorm",
        },
        {
            title: "Anything",
            logo: './ideas.jpeg',
            link: "/anything",
        },
        {
            title: "Search",
            logo: './search.jpeg',
            link: "/search",
        },
        {
            title: "Help",
            logo: './help.jpeg',
            link: "/help",
        }
        ]


  return (
    <div className="Main">
        <Typography variant="h1" component="h2" gutterBottom>
            Z.A.G AI
        </Typography>
        <Grid container spacing={2}>
            {pages.map((page) => (
                <Grid item xs={4} >
                    <MediaCard  title={page.title} picture={page.logo} link={page.link}/>
                </Grid>
            ))}
        </Grid>
        <Button variant="contained" sx={{
            marginTop: "2rem",
        }}>Projects</Button>
    </div>
  );
}

export default Main;
