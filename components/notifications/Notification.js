import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function Notification({ type, text }) {
  const [open, setOpen] = useState(true);
  setTimeout(() => {
    setOpen(false);
  }, 3000);
  return (
    <Snackbar open={open} autoHideDuration={6000}>
      <Alert severity={type} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
