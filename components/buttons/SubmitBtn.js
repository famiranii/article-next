import React from "react";
import { Button, CircularProgress } from "@mui/material";

export default function SubmitBtn({ status, submitForm, disabled, text }) {
  return (
    <Button
      disabled={!disabled}
      variant="contained"
      sx={{ marginTop: 4 }}
      size="large"
      color="yellow"
      onClick={submitForm}
    >
      {text ? text : "submit"}
      {status === "loading" && (
        <CircularProgress size={20} color="navyBlue" sx={{ marginLeft: 2 }} />
      )}
    </Button>
  );
}
