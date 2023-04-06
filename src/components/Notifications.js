import * as React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';

export default function Notifications() {
    const items = [
        { title: 'New Project Created', color: 'success', icon: <CheckCircleIcon /> },
        { title: 'New Feature', color: 'warning', icon: <WarningIcon /> },
        { title: 'Please Update Profile', color: 'danger', icon: <ReportIcon /> },
        { title: 'Check info', color: 'info', icon: <InfoIcon /> },
      ];
    return (
       
        <div sx={{ display: 'flex', width: 100, flexDirection: 'column', borderRadius: 10 }}>
        {items.map(({ title, icon }) => (
          <Alert
            key={title}
            sx={{ alignItems: 'flex-start', borderRadius: 0 }}
            startDecorator={React.cloneElement(icon, {
              sx: { mt: '2px', mx: '4px' },
              fontSize: 'xl2',
            })}
            
            variant="outlined"
            color="neutral"
            
          >
            <div>
              <Typography fontWeight="lg" mt={0.25}>
                {title}
              </Typography>
              <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
                This is a time-sensitive {title} Alert.
              </Typography>
            </div>
          </Alert>
        ))}
      </div>
    )
}