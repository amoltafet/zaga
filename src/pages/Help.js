import { Box, Grid, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuBar from '../components/MenuBar';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PhotoFilterOutlinedIcon from '@mui/icons-material/PhotoFilterOutlined';
import React from 'react';


function Help (){

    const Item = styled(Card)(({ theme, text }) => ({
        ...theme.typography.body2,
        border: "1px solid rgba(0, 0, 0, 0.5)",
        textAlign:'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div
        style={{
            marginTop: "10%",
            marginLeft: "10%",
            marginRight: "10%",
          }}
        >
        <MenuBar />
        <Box sx={{flexGrow: 1, mt:"2%", alignItems:'center'}}>
            <Grid container spacing={2} sx={{border:"1px solid rgba(0, 0, 0, 0.5)"}}>
                <Grid>
                    <Item>
                    <EditOutlinedIcon />
                    <h4>Writer</h4>
                    </Item>
                </Grid>
                <Grid item xs={4} >
                    <Item><CodeOutlinedIcon/></Item>
                </Grid>
                <Grid item xs={4}>
                    <PsychologyAltOutlinedIcon/>
                </Grid>
                <Grid item xs={4}>
                    <SearchOutlinedIcon/>
                </Grid>
                <Grid item xs={4}>
                    <MapOutlinedIcon/>
                </Grid>
                <Grid item xs={4}>
                    <PhotoFilterOutlinedIcon/>
                </Grid>

            </Grid>
        </Box>
    </div>

    )
}

export default Help
