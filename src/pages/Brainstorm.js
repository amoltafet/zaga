import React, { useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import MenuBar from "../components/MenuBar";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';



function Brainstorm () {


    const [inputText, setInputText] = useState('');
    const handleInput = (e) => {
      setInputText(e.target.textContent);
    };
    return (
        <div>
          <MenuBar />
          <Typography variant="h5" align="center" sx={{marginTop: '6%'}}>
          NewChatGPT For Brainstorming
          </Typography>
          <Typography variant="h6" align="center" sx={{margin: '3% 10% 0 10%'}}>
          New ChatGPT used for code completion only. It cannot do anything else for now until new features are added.          </Typography>
            <div style={{
              marginTop: "3%",
              marginLeft: "10%",
              marginRight: "10%",
            }}>
<Box sx={{ border: '1px solid rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column', height: '30%', width: '100%', mb:1}}>
  <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 0, m:1, mb:-1 }}>
    <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
      Try
    </Typography>
  </Box>
  <Box sx={{ p: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', m:2, p:2,borderRadius:'16px'  }}>Filler</Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ justifyContent:'center', alignItems: 'center', border: '1px solid black', m:2, p:2,borderRadius:'16px' }} >Filler </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ justifyContent:'center', alignItems: 'center', border: '1px solid black', m:2, p:2,borderRadius:'16px' }} >Filler </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" contentEditable onInput={handleInput}sx={{border: '1px solid black', m:2, p:1, borderRadius:'16px'}}>
          Type Here
        </Typography>
      </Grid>
    </Grid>
  </Box>
</Box>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button variant="contained" sx={{ height: 25, w: 40, mt:1, mb:3, alignSelf: 'flex-start' }}>Old Chats</Button>
      </div>
      <Card sx={{display:'flex', minWidth: 300, mt:1}}>
        <CardContent>
          <Button variant="contained" sx={{ height: 25, w: 40}}>Search</Button>
            <List>
              <ListItem><ListItemText variant ='h5' sx={{}}>How to write an http request in Java? </ListItemText></ListItem>  
              <ListItem><ListItemText variant ='h5' sx={{}}>What python libraries would help my project? </ListItemText></ListItem>  
              <ListItem><ListItemText variant ='h5' sx={{}}>What are stars made of? </ListItemText></ListItem>  
            </List>
        </CardContent>
      </Card>
      <Card sx={{minWidth: 300, mt:1, mb:1}}>
      <CardContent sx={{display: 'flex'}}>
            <List >
              <ListItem><ListItemText variant ='h5' sx={{}}>Light Mode</ListItemText></ListItem>
              <ListItem><ListItemText variant ='h5' sx={{}}>Updates and FAQ</ListItemText></ListItem> 
              <ListItem><ListItemText variant ='h5' sx={{}}>Clear all Conversations</ListItemText></ListItem>
            </List>
        </CardContent>
      </Card>
    </div>
  </div>
  );
}

export default Brainstorm;