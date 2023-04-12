import React, { useEffect } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {  useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword, getAuth   } from 'firebase/auth';
import { useState } from 'react';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function Login(){

    const paperStyle={padding :20,height:'60vh',width:280, margin:"10% auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('null');

    const onLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            sessionStorage.setItem("user", user.uid);
            navigate("/")
        })
        .catch((error) => {
            if(error.code === 'auth/wrong-password'){
                setError('Incorrect password or email');
            }
            if(error.code === 'auth/user-not-found'){
                setError('User is not found');
            }
        });
       
    }


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
                

    return(
        <Grid>
            
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center' sx={{
                    paddingTop: "20px",
                }}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter email' variant="outlined" fullWidth required onChange={(e)=>setEmail(e.target.value)}/>
                <div style={{height: "10px"}}></div>
                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required onChange={(e)=>setPassword(e.target.value)}/>
                <div style={{height: "10px"}}></div>
                <FormControlLabel  control={<Checkbox />} label="Remember me" />

                <div style={{height: "10px"}}></div>
                {errorDisplay()}

                <Button type='submit' color='primary' variant="outlined" style={btnstyle} fullWidth onClick={onLogin}     >Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password?
                </Link>
                </Typography>
                <Typography> Do you have an account?
                     <Link href="/register" >
                        Sign Up 
                         </Link>
                </Typography>
               
            </Paper>
            
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
        </Grid>
    )
}

