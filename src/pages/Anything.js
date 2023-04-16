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
import Chip from '@mui/joy/Chip';
import Sun from '@mui/icons-material/LightMode';
import HttpIcon from '@mui/icons-material/Http';
import SurfingOutlinedIcon from '@mui/icons-material/SurfingOutlined';
import CircularProgress from '@mui/joy/CircularProgress';

function Anything() {

  const [data, setData] = useState([]);
  const [waiting, setWaiting] = useState(false);

  const clearData = () => {
    setData([]);
  };

  const ButtonStyle = () => {
    if (waiting) {
      return (
        <Button  disabled
          sx={{
            marginBottom: '1%',
            marginLeft: '20%',
            marginRight: '20%',
            width: '60%',
          }}><CircularProgress size="sm"/></Button>
      )
    } else {
      return (
        <Button color="primary" onClick={addData}
          sx={{
            marginBottom: '1%',
            marginLeft: '20%',
            marginRight: '20%',
            width: '60%',
          }}>Send</Button>
      )
    }
  }
    
  const addData = async () => {
    // get value by id
    let value = document.getElementById('input').value;
    if (value === "") {
      return;
    }
    setData([...data, {user_input: value, chatgpt_response: ""}]);
    setWaiting(true);
    setTimeout(() => {
      var objDiv = document.getElementById("outputBox");
      objDiv.scrollTo(0, objDiv.scrollHeight, { behavior: 'smooth' });
    }, 0);
    const prompts = await GeneratePrompts(value);
    const apiResponse = prompts;
    // update data
    setData([...data, {user_input: value, chatgpt_response: apiResponse}]);    
    setWaiting(false);
    document.getElementById('input').value = "";
    // scroll to bottom
    setTimeout(() => {
      var objDiv = document.getElementById("outputBox");
      objDiv.scrollTo(0, objDiv.scrollHeight, { behavior: 'smooth' });
    }, 0);
    console.log(data)

  };
  
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


    return data.map((item) => {
      return (
                               
        <>
          <Alert variant="soft" sx={{
            marginBottom: '1%',
            marginLeft: '20%',
          }}>{item.user_input}</Alert>
          {
            item.chatgpt_response === "" ?
            <></>
            :
            <Alert variant="outlined" sx={{
              marginBottom: '1%',
              marginRight: '20%',
            }}>{item.chatgpt_response}</Alert>
            
          }
      



        </>
      )      
      
    });
  }
  }

  let BoxHeight = window.innerHeight * 0.7;

  const handleChipClick = (e) => {
    e.preventDefault();
    console.log('Clicked!');
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
    <div style={{
       position: 'fixed',
       bottom: '0',
       width: '60%',
       marginLeft: '20%',
       marginRight: '20%',
       marginBottom: '5%',
     

    }}>
      {data.length === 0 ? 
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>

<Chip   variant="outlined"  startDecorator={<HttpIcon />} onClick={() => alert('You clicked the  button!')}

sx={{
        marginBottom: '1%',
}}>
        How to create a HTTP request in React?
      </Chip>
      <Chip variant="outlined" startDecorator={<Sun />}
      onClick={() => alert('You clicked the  button!')}
      sx={{
        marginBottom: '1%',
}}>
        Does the sun move around because of the earth?
      </Chip>
      <Chip variant="outlined" startDecorator={<SurfingOutlinedIcon />}
      
      onClick={() => alert('You clicked the  button!')}
      sx={{
        marginBottom: '1%',
}}>
        Can I go surfing in the winter?
      </Chip>
      </div> : <></>}
    <Input
  startDecorator={<TextFieldsIcon />}
  endDecorator={ButtonStyle()}
 
  id="input"
  placeholder="Type something..."
/> </div>

    </div>
  );
}



export default Anything;
