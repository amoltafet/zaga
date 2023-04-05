import { Box, Button, Card, Grid, Typography } from "@mui/material";
import Input from '@mui/joy/Input';
import TextFieldsIcon from '@mui/icons-material/TextFields';
function Anything() {

  return (
    <div className="Main">
     
           
            <Grid container spacing={2}>
                <Grid item 
                    xs={12} md={12} lg={12}
                    sx={{
                        border: '1px solid #e0e0e0',
                        borderRadius: '10px',
                        padding: '8px',
                    }}>
                        <Box sx={{ width: '100%', paddingTop: '20rem' }} />
                        
                        <Input startDecorator={<TextFieldsIcon />} endDecorator={<Button color="primary">Send</Button>} 
                        sx={{
                            position: 'obsolute',
                            
                            bottom: '1',
                        }}
                        />
                    </Grid>
            </Grid>

           
    </div>
  );
}

export default Anything;
