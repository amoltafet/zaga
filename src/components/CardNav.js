import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

const images = require.context("../images", true);


export default function MediaCard({props}) {
  const title = props.title;
  const logo = props.logo;
  const link = props.link;
  const describe = props.describe;
  const example = props.example;

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: "100%",
        gap: 2,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        overflow: 'hidden',
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <img
          src={images(`${logo}`) }
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <div>
        <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
          {title}
        </Typography>
        <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href={link}
            sx={{ color: 'text.tertiary' }}
          >
            {describe}
          </Link>
        </Typography>
        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: 'none' }}
        >
          {example}
        </Chip>
      </div>
    </Card>
  );
}


