import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import MenuBar from "../components/MenuBar";
import Button from "@mui/joy/Button";
import { Grid } from "@mui/material";
import Footer from "../components/Footer";
import { getApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default function Projects() {
  const [projects, setProjects] = React.useState([]);
  const [userID, setUserID] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const app = getApp();
  const db = getDatabase(app);

  React.useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userID = user.uid;
        setUserID(userID);
        console.log('User is logged in with ID:', userID);

        const projectsRef = ref(db, 'users/' + userID + '/projects');
        console.log('About to fetch projects for user:', userID);
        onValue(
          projectsRef,
          snapshot => {
            console.log('Fetched projects for user:', userID);
            const data = snapshot.val();
            setProjects(data ? Object.keys(data).map(key => ({ key, ...data[key] })) : []);
            setIsLoading(false);
          },
          error => {
            console.log('Error fetching projects:', error);
            setIsLoading(false);
          }
        );
      } else {
        console.log('User not logged in');
        setIsLoading(false);
      }
    });

    // Don't forget to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>      
    <MenuBar />

    <div
      style={{
        marginLeft: "20%",
        marginRight: "20%",      
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "h1"}}>
        Projects
      </Typography>
      <Button variant="outlined" size="sm" sx={{ marginTop: "1%", marginBottom: "1%", marginRight: "0.5%" }}>
        Create New Project
      </Button>
      <Button variant="soft" color="danger" size="sm" sx={{ marginTop: "1%" }} >
        Delete Project
      </Button>

      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <Grid container spacing={2}>
          {projects.map((project, index) => (
            <Grid item xs={4} key={index}>
              <OverflowCard project={project} />
            </Grid>
          ))}
        </Grid>
      )}
      
    </div>
    <Footer />
    </>
  );
}

function OverflowCard({ project }) {
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
      <Typography variant="h4">{project.name}</Typography>
      <Divider sx={{ my: "1%" }} />
      <Typography variant="body2" sx={{ color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
        {project.data?.boxOne?.array?.join ? project.data.boxOne.array.join("\n") : ''}
      </Typography>
      <Button sx={{ marginTop: "1%" }}>Open Project</Button>
    </Card>
  );
}

