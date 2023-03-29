import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const images = require.context("../images", true);

export default function MediaCard({title, picture, link}) {
 

  console.log(picture)
  return (
    <Card >
      <CardMedia
        sx={{ height: 140 }}
        image={images(`${picture}`)}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => window.location.href = link} variant="outlined">Start</Button>
      </CardActions>
    </Card>
  );
}