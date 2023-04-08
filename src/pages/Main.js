import { Button, Grid, Typography } from "@mui/material";
import MediaCard from "../components/CardNav";
import ThumbUp from '@mui/icons-material/ThumbUp';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import MenuBar from "../components/MenuBar";

const images = require.context("../images", true);


function Main() {
    
    const pages = [
        {
            title: "Writer",
            logo: "./writing.jpeg",
            link: "/writer",
            describe: "Generate any text based on a prompt",
            example: "Write me a story about a dog",
        },
        {
            title: "Generate",
            logo: './code.jpeg',
            link: "/generate",
            describe: "Generate code based on a prompt",
            example: "Generate http code for a website",
        },
        {
            title: "Brainstorm",
            logo: './brainstorm.jpeg',
            link: "/brainstorm",
            describe: "Generate ideas based on a prompt",
            example: "Generate ideas for a new business",
        },
        {
            title: "Anything",
            logo: './ideas.jpeg',
            link: "/anything",
            describe: "Generate anything based on a prompt",
            example: "What is the meaning of life?"
        },
        {
            title: "Search",
            logo: './search.jpeg',
            link: "/search",
            describe: "Search for anything based on a prompt",
            example: "Where is the nearest coffee shop?"    
        },
        {
            title: "Help",
            logo: './help.jpeg',
            link: "/help",
            describe: "Get help with anything based on a prompt",
            example: "How do I make a website?"
        }
        ]


  return (
    <div>     
        <MenuBar />

    <div style={{
        marginTop: "10rem",
        position: "absolute",
        left: "10%",
        right: "10%",

    }}>
        
        <Grid container spacing={2}>
            {pages.map((page) => (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <MediaCard  props={page}/>
                </Grid>
            ))}
        </Grid>
        <Button variant="contained" onClick={() => {window.location.href = "/projects"} }
        sx={{ marginTop: "2rem", }}>Projects</Button>
        <Button variant="outlined" sx={{marginTop: "2rem", marginLeft: "5px"}}><QuestionMarkIcon /></Button>
        <Button variant="outlined" color="primary" sx={{marginTop: "2rem", marginLeft: "5px"}}>
            <ThumbUp />
        </Button>
    </div>
    </div>
  );
}

export default Main;
