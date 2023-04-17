import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { getAuth } from 'firebase/auth';

export default function Profile() {
    const [user, setUser] = React.useState(null);

    
    React.useEffect(() => {
        setUser(getAuth().currentUser);
    }, []);
    

    const Logout = () => {
        getAuth().signOut();
        sessionStorage.removeItem("user");
        window.location.href = "/"
        
    }
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px",
        }}>
          
           {user ? (
            <>
            <div style={{
                display: "flex"
            }}>
                      <Avatar sx={{ width: 100, height: 100, flexShrink: 0, flexGrow: 0 }} src="/static/images/cards/live-from-space.jpg" />

            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto', overflow: "hidden" }}>
                <Typography component="div" variant="h5">
                    {user.displayName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                   moltafeta@gmagsfafsafasfasfasfasfaasasf.com
                </Typography>
              
                </CardContent>
            
            </Box>
            
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Button variant="outlined" sx={{marginTop: "20px"}} onClick={() => {
                    window.location.href = "/projects"
                }}>
                   My Projects
                </Button>
                <Button variant="outlined" sx={{marginTop: "20px", marginLeft: "10px"}} onClick={Logout}>
                    Logout
                </Button>
            </Box>
            </>
           ) : (
                 <div >
                <Typography variant="overline" sx={{ p: 2 }} >Please login to view your profile</Typography>
                <Button variant="outlined" onClick={() => {
                    window.location.href = "/login"
                }}>
                    Login
                </Button> 
                <Button variant="outlined" sx={{marginLeft: "3px"}} onClick={() => {
                    window.location.href = "/register"
                }}>
                    Register
                </Button>

                </div>
           )
            }

        </div>
    )
}