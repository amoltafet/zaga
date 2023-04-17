import React from 'react'
import { useState, useEffect } from "react";
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {  useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function Register(){

    const paperStyle={padding :20,height:'60vh',width:280, margin:"10% auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const navigate = useNavigate();


    const [userEmail, setUserEmail] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [error, setError] = useState('null');

    useEffect (() => {
        // add timer to close the alert
        const timer = setTimeout(() => {
            setError('null');
        } , 6000);
    }, [error])

    const errorDisplay = () => {
        if (error !== 'null') {
            console.log(error);
            return (
                <Alert severity="warning" sx={{ marginBottom: "10px" }} autoHideDuration={100} >
                    {error}
                </Alert>
            )
        } else {
            return null;
        }
    }

    const handleEmailChange = (event) => {
        setUserEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setUserPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!userEmail || !userPassword ) {
            setError('All fields are required');
            return;
          } 
        
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userEmail, userPassword) 
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            sessionStorage.setItem("user", user.uid);
            navigate("/")
            window.location.reload();

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    };

    return(
        <>
        

        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center' sx={{
                    paddingTop: "20px",
                }}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Create an Account</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter email' variant="outlined" fullWidth required onChange={handleEmailChange}/>
                <div style={{height: "10px"}}></div>
                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required onChange={handlePasswordChange}/>
                <div style={{height: "10px"}}></div>
                <FormControlLabel  control={<Checkbox />} label="Remember me" />

                <div style={{height: "10px"}}></div>
                {errorDisplay()}
                <Button type='submit' color='primary' variant="outlined" style={btnstyle} fullWidth onClick={handleSubmit}>Sign Up</Button>
              
                <Typography> Do you have an account?
                     <Link href="/login" >
                        Sign In
                         </Link>
                </Typography>
               
            </Paper>
            
        </Grid>
        <Button variant="outlined" 
                size='small'
                sx={{marginLeft: "3px", marginTop: "2%", marginLeft: "2%",
                   position: "fixed",
                   top: "0",
                    left: "1",
                }} onClick={() => {
                    window.location.href = "/"
                }}>
                    Return to Home
                </Button>
        </>
    )
}

