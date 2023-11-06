import ClientLayout from "@/components/layout/ClientsLayout";
import styles from "./addArticle.module.css";
import React, { useReducer, useState } from "react";
import { TextField, Box, Paper } from "@mui/material";
import Topics from "@/components/add-article/Topics";
import Notification from "@/components/notifications/Notification";
import SubmitBtn from "@/components/buttons/SubmitBtn";

const reducer = (state, action) => {
  switch (action.type) {
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
  let initialEmail = "";
  if (typeof window !== "undefined") {
    initialEmail = localStorage.getItem("articlesEmail") || "";
  }
  const [state, dispatch] = useReducer(reducer, {
    email: initialEmail || "",
    title: "",
    description: "",
    text: "",
    topics: [],
  });
  const [status, setStatus] = useState("none");

  const dispatchTitle = (e) => {
    dispatch({ type: "SET_TITLE", payload: e.target.value });
  };
  const dispatchDescription = (e) => {
    dispatch({ type: "SET_DESCRIPTION", payload: e.target.value });
  };
  const dispatchText = (e) => {
    dispatch({ type: "SET_TEXT", payload: e.target.value });
  };
  const dispatchTopic = (e) => {
    const topics = state.topics.slice();
    topics.push(e);
    dispatch({ type: "SET_SLUGS", payload: topics });
  };
  const removeTopic = (deletedTopic) => {
    const newTopics = state.topics.filter((topic) => topic !== deletedTopic);
    dispatch({ type: "SET_SLUGS", payload: newTopics });
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
        setStatus("success");
        state.title = "";
        state.description = "";
        state.text = "";
        state.topics = [];
      } else {
        console.error("POST request failed");
        setStatus("error");
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
            <Topics
              dispatchTopic={dispatchTopic}
              topics={state.topics}
              removeTopic={removeTopic}
            />
          </Box>
        </Box>
        <SubmitBtn status={status} submitForm={submitForm} />

        {status === "success" && (
          <Notification type={status} text="your article added successfully" />
        )}
        {status === "error" && (
          <Notification type={status} text="we had an error, try again" />
        )}
      </Paper>
    </ClientLayout>
  );
}

export default Index;
