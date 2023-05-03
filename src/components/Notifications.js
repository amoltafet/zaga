import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Card from "@mui/joy/Card";

export default function Notifications() {
  const items = [
    {
      title: "New Project Created",
      color: "success",
      icon: <CheckCircleIcon />,
    },
    { title: "New Feature", color: "warning", icon: <WarningIcon /> },
    { title: "Please Update Profile", color: "danger", icon: <ReportIcon /> },
    { title: "Check info", color: "info", icon: <InfoIcon /> },
  ];
  return (
    <div
      sx={{
        display: "flex",
        width: 100,
        flexDirection: "column",
        borderRadius: 10,
        backgroundColor: "background.paper",
      }}
    >
      {items.map(({ title, icon, color }) => (
        <Card
          orientation="horizontal"
          variant="outlined"
          sx={{ width: 260, bgcolor: "background.body", borderRadius: 0 }}
        >
          {icon}
          <CardContent sx={{ px: 2 }}>
            <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
              {title}
            </Typography>
            <Typography level="body2"> This is an alert message </Typography>
          </CardContent>
          <Divider />
          <CardOverflow
            variant="soft"
            color="primary"
            sx={{
              px: 0.2,
              writingMode: "vertical-rl",
              textAlign: "center",
              fontSize: "xs2",
              fontWeight: "xl2",
              letterSpacing: "1px",
              textTransform: "uppercase",
              borderRadius: 0,
            }}
          >
            {color}
          </CardOverflow>
        </Card>
      ))}
    </div>
  );
}
