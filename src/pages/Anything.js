import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Input from '@mui/joy/Input';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Alert from '@mui/joy/Alert';
import MenuBar from "../components/MenuBar";
import GeneratePrompts from "../util/GeneratePrompts.js";

function Anything() {

  const [data, setData] = useState([]);

  const clearData = () => {
    setData([]);
  };
    
  const addData = async () => {
    // get value by id
    let value = document.getElementById('input').value;
    console.log(value);
    if (value === "") {
      return;
    }
    const prompts = await GeneratePrompts(value);
    const apiResponse = prompts;
    console.log(prompts);
    setData([...data, {user_input: value, chatgpt_response: apiResponse}]);
    document.getElementById('input').value = "";
    // scroll to bottom
    console.log(document.getElementById("outputBox").scrollHeight);
    setTimeout(() => {
      var objDiv = document.getElementById("outputBox");
      objDiv.scrollTo(0, objDiv.scrollHeight, { behavior: 'smooth' });
    }, 0);

  };

  console.log(data);

  const mapData = () => {
    if (data.length === 0) {
      return (
        <Typography variant="outlined"
          sx={{
            marginBottom: '20%',
            marginTop: '20%',
            marginLeft: '25%',
            marginRight: '20%',
          }}>No conversations yet. Start one by typing in the box below.</Typography>
      )
    } else {


    return data.map((conversation) => (
                              
        <>
          <Alert variant="soft" sx={{
            marginBottom: '1%',
            marginLeft: '20%',
          }}>{conversation.user_input}</Alert>
          <Alert variant="outlined" sx={{
            marginBottom: '1%',
            marginRight: '20%',
          }}>{conversation.chatgpt_response}</Alert>



        </>
        
    )) 
    }
          
    }

  let BoxHeight = window.innerHeight * 0.7;

  return (
    <div>
      <MenuBar />
    <div style={{
      marginTop: "5%",
      marginLeft: "20%",
      marginRight: "20%",

  }}>
  
            <Grid container spacing={2}>
                <Grid item 
                    xs={12} 
                    sx={{
                        
                        padding: '8px',
                    }}>
                            <Tooltip title="Restart">
                              <IconButton onClick={clearData}>
                                <RefreshIcon />
                              </IconButton>
                            </Tooltip>

                        <Box sx={{ paddingTop: '2%', maxHeight: BoxHeight, overflow: "scroll" }} id="outputBox">
                            {mapData()}
                        </Box>
                        
                       
                        
                    </Grid>
                   
            </Grid>

           
    </div>
    <Input
  startDecorator={<TextFieldsIcon />}
  endDecorator={<Button color="primary" onClick={addData}>Send</Button>}
  sx={{
    position: 'fixed',
    bottom: '0',
    width: '60%',
    marginLeft: '20%',
    marginRight: '20%',
    marginBottom: '5%',
  }}
  id="input"
  placeholder="Type something..."
/>

    </div>
  );
}



export default Anything;
