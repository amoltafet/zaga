import * as React from 'react';
import Typography from '@mui/joy/Typography';
import { Divider } from '@mui/material';
import { Box } from '@mui/joy';


export default function Footer() {
    return (
        <div>
            <Divider sx={{marginTop: "1%"}}/>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "1%" }}>
                <Typography variant="overline" sx={{ flexGrow: 1, p: 1 }}>
                    © 2023 - Gonzaga University
                </Typography>
                <Typography variant="overline" sx={{ flexGrow: 1, p: 1 }}>
                    This application is part of a research project conducted by the Daniel Olivares, Ph.D.
                </Typography>
                <Typography variant="overline" sx={{ flexGrow: 1, p: 1 }}>
                 
                </Typography>
            </Box>
        </div>
    );
}
