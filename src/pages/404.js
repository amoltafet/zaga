import React from "react";
import Button from "@mui/joy/Button";

export default function Custom404() {
  return (
    <div className="container">
      <div className="row">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
            textAlign: "center",
          }}
        >
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <Button
            variant="outlined"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Go back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
