import ClientLayout from "@/components/layout/ClientsLayout";
import styles from "./addArticle.module.css";
import React, { useReducer } from "react";
import { TextField, Box, Button, Paper } from "@mui/material";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_TEXT":
      return { ...state, text: action.payload };
    case "SET_SLUGS":
      return { ...state, slugs: action.payload };
    default:
      return state;
  }
};

function Index() {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    title: "",
    description: "",
    text: "",
    slugs: "",
  });

  const dispatchEmail = (e) => {
    dispatch({ type: "SET_EMAIL", payload: e.target.value });
  };
  const dispatchTitle = (e) => {
    dispatch({ type: "SET_TITLE", payload: e.target.value });
  };
  const dispatchDescription = (e) => {
    dispatch({ type: "SET_DESCRIPTION", payload: e.target.value });
  };
  const dispatchText = (e) => {
    dispatch({ type: "SET_TEXT", payload: e.target.value });
  };
  const dispatchSlugs = (e) => {
    dispatch({ type: "SET_SLUGS", payload: e.target.value });
  };
  const submitForm = async () => {
    console.log(state);
    try {
      const response = await fetch("../api/articleHandler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      if (response.ok) {
        console.log("POST request was successful");
      } else {
        console.error("POST request failed");
      }
    } catch (error) {
      console.error("An error occurred while making the POST request", error);
    }
  };
  return (
    <ClientLayout>
      <Paper className={styles.container}>
        <Box className={styles.form} component="form">
          <Box width={2 / 3}>
            <Box sx={{ display: "flex" }}>
              <TextField
                label="email"
                color="navyBlue"
                fullWidth
                onChange={dispatchEmail}
                value={state.email}
              />
              <TextField
                label="title"
                color="navyBlue"
                fullWidth
                onChange={dispatchTitle}
                value={state.title}
              />
            </Box>
            <TextField
              label="description"
              color="navyBlue"
              fullWidth
              sx={{ marginY: 4 }}
              minRows={1}
              multiline
              onChange={dispatchDescription}
              value={state.description}
            />
            <TextField
              label="text"
              color="navyBlue"
              fullWidth
              minRows={5}
              multiline
              onChange={dispatchText}
              value={state.text}
            />
          </Box>
          <Box width={1 / 4}>
            <TextField
              label="slugs"
              color="navyBlue"
              rows={5}
              fullWidth
              onChange={dispatchSlugs}
              value={state.slugs}
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{ marginTop: 4 }}
          size="large"
          color="yellow"
          onClick={submitForm}
        >
          submit
        </Button>
      </Paper>
    </ClientLayout>
  );
}

export default Index;
