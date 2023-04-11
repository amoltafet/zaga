import React, { useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import Input from '@mui/joy/Input';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Alert from '@mui/joy/Alert';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
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
<Box sx={{ border: '1px solid black', display: 'flex', flexDirection: 'column', height: '30%', width: '100%'}}>
  <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, m:1 }}>
    <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
      Try
    </Typography>
  </Box>
  <Box sx={{ p: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', p: 2  }}>Filler</Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ justifyContent:'center', alignItems: 'center', border: '1px solid black', p: 2 }} >Filler </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ justifyContent:'center', alignItems: 'center', border: '1px solid black', p: 2 }} >Filler </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" contentEditable onInput={handleInput}sx={{border: '1px solid black'}}>
          Type Here
        </Typography>
      </Grid>
    </Grid>
  </Box>
</Box>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button variant="contained" sx={{ height: 25, w: 40, m: 1, alignSelf: 'flex-start' }}>Old Chats</Button>
      </div>
      <Card sx={{display:'flex', minWidth: 300}}>
        <CardContent>
          <Button variant="contained" sx={{ height: 30, w: 40, m: 1, alignSelf:'flex-end',justifySelf:'flex-end'}}>Search</Button>

            <List >
                <ListItem>
                <ListItemText variant ='h5' sx={{}}>How to write an http request in Java </ListItemText>
                </ListItem> 
            </List>
        </CardContent>
      </Card>
      <Card sx={{minWidth: 300}}>
      <CardContent sx={{display: 'flex'}}>
            <List >
                <ListItem>
                  <ListItemText></ListItemText>

                </ListItem>
            </List>
        </CardContent>
      </Card>
    </div>
  </div>
  );
}

export default Brainstorm;