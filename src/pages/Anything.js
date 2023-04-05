import React, { useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import Input from '@mui/joy/Input';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Alert from '@mui/joy/Alert';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import MenuBar from "../components/MenuBar";

function Anything() {


  const conversations = [
    {
      "user_input": "What's the weather like today?",
      "chatgpt_response": "According to the forecast, it should be mostly sunny with a high of 75 degrees."
    },
    {
      "user_input": "Why is it like that?",
      "chatgpt_response": "It's due to a high pressure system that's currently over the area."
    },
    {
      "user_input": "Can you recommend a good restaurant in the area?",
      "chatgpt_response": "Sure, I recommend checking out Joe's Pizza. They have great reviews and are known for their New York-style slices."
    },
    {
      "user_input": "How can I reset my password?",
      "chatgpt_response": "You can reset your password by going to the 'Forgot Password' page and entering your email address."
    }
  ]

  const [data, setData] = useState(conversations);
    
  const addData = () => {
    // get value by id
    let value = document.getElementById('input').value;
    console.log(value);
    if (value === "") {
      return;
    }
    setData([...data, {user_input: value, chatgpt_response: "I am not connected right now"}]);
    // remap the data
  };

  console.log(data);

  const mapData = () => {
    return data.map((conversation) => (
                              
        <>
          <Alert variant="soft" sx={{
            marginBottom: '1%',
            marginLeft: '20%',
          }}>{conversation.user_input}</Alert>
          <Alert variant="outlined" 
            startDecorator={<PlaylistAddCheckCircleRoundedIcon />}

          sx={{
            marginBottom: '1%',    
            marginRight: '20%',                                    
          }}>{conversation.chatgpt_response}</Alert>

        </>
        
    )) 
          
    }

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
                        border: '1px solid #e0e0e0',
                        borderRadius: '10px',
                        padding: '8px',
                    }}>
                            <Tooltip title="Restart">
                              <IconButton>
                                <RefreshIcon />
                              </IconButton>
                            </Tooltip>

                        <Box sx={{ paddingTop: '2%' }} >
                            {mapData()}
                        </Box>
                        
                        <Input startDecorator={<TextFieldsIcon />} endDecorator={<Button color="primary" onClick={addData}>Send</Button>
                        }
                        sx={{
                            position: 'obsolute',
                            bottom: '1',
                        }}
                        id="input" placeholder="Type something..."
                        />
                        
                    </Grid>
            </Grid>

           
    </div>
    </div>
  );
}

export default Anything;
