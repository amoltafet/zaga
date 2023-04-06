
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

import Switch from '@mui/joy/Switch';


export default function Settings( {toggleDrawer, anchor} ) {
    const [checked, setChecked] = React.useState(false);

    return (
        <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300,
        padding: 2,
    }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, p: 2 }}>
        Settings
      </Typography>
      
     
    <FormControl
      orientation="horizontal"
      sx={{ width: '100%', justifyContent: 'space-between' }}
    >
      <Box>
        <FormLabel>Dark Mode</FormLabel>
        <FormHelperText sx={{ mt: 0 }}>Disabled by default.</FormHelperText>
      </Box>
      <Switch
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        color={checked ? 'success' : 'neutral'}
        variant="outlined"
        endDecorator={checked ? 'On' : 'Off'}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
    </FormControl>
    <List>

        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
    )


}