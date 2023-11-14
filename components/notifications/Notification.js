import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function Notification({ type, text }) {
  const [open, setOpen] = useState(true);
  setTimeout(() => {
    setOpen(false);
  }, 4000);
  return (
    <Snackbar
      anchorOrigin={{ vertical:'top', horizontal:"center" }}
      open={open}
      autoHideDuration={6000}
    >
      <Alert severity={type} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
