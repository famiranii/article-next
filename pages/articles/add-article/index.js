import ClientLayout from "@/components/layout/ClientsLayout";
import styles from "./addArticle.module.css";
import React, { useReducer, useState } from "react";
import { TextField, Box, Button, Paper } from "@mui/material";
import Topics from "@/components/add-article/Topics";
import CircularProgress from "@mui/material/CircularProgress";
import Notification from "@/components/notifications/Notification";

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
      return { ...state, topics: action.payload };
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
    topics: "",
  });
  const [status, setStatus] = useState("none");

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
  const dispatchTopics = (e) => {
    console.log(e);
    dispatch({ type: "SET_SLUGS", payload: e });
  };
  const submitForm = async () => {
    setStatus("loading");
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
        setStatus("success");
      } else {
        console.error("POST request failed");
      }
    } catch (error) {
      console.error("An error occurred while making the POST request", error);
      setStatus("error");
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
            <Topics dispatchTopics={dispatchTopics} />
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
          {status === "loading" && (
            <CircularProgress
              size={20}
              color="navyBlue"
              sx={{ marginLeft: 2 }}
            />
          )}
        </Button>
        {status === "success" && (
          <Notification type={status} text="your article added successfully" />
        )}
        {status === "error" && (
          <Notification type={status} text="we had an error try again" />
        )}
      </Paper>
    </ClientLayout>
  );
}

export default Index;
