import ClientLayout from "@/components/layout/ClientsLayout";
import styles from "./addArticle.module.css";
import React, { useReducer, useState } from "react";
import { TextField, Box, Paper } from "@mui/material";
import Topics from "@/components/add-article/Topics";
import Notification from "@/components/notifications/Notification";
import SubmitBtn from "@/components/buttons/SubmitBtn";
import AddArticleInput from "@/components/inputs/AddArticleInput";
import UseForm from "@/components/hook/useForm";
import { minValidator } from "@/components/validator/Rules";

function Index() {
  const [status, setStatus] = useState("none");
  const [topics, setTopics] = useState([]);
  const [formState, getInputInfo] = UseForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      text: { value: "", isValid: false },
    },
    false
  );
  console.log(formState);

  const dispatchTopic = (topic) => {
    setTopics([...topics, topic]);
  };
  const removeTopic = (deletedTopic) => {
    const newTopics = topics.filter((topic) => topic !== deletedTopic);
    setTopics(newTopics);
  };

  const submitForm = async () => {
    setStatus("loading");
    const completeForm = {
      email: localStorage.getItem("articlesEmail"),
      title: formState.inputValue.title.value,
      description: formState.inputValue.description.value,
      text: formState.inputValue.text.value,
      topics,
    };
    try {
      const response = await fetch("../api/articleHandler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeForm),
      });
      if (response.ok) {
        setStatus("success");
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
            <AddArticleInput
              id="title"
              minRows={1}
              placeHolder="minimum length is 10"
              getInputInfo={getInputInfo}
              validation={[minValidator(10)]}
            />
            <AddArticleInput
              id="description"
              minRows={1}
              placeHolder="minimum length is 25"
              getInputInfo={getInputInfo}
              validation={[minValidator(25)]}
            />
            <AddArticleInput
              id="text"
              minRows={5}
              placeHolder="minimum length is 200"
              getInputInfo={getInputInfo}
              validation={[minValidator(200)]}
            />
          </Box>
          <Box width={1 / 4}>
            <Topics
              dispatchTopic={dispatchTopic}
              topics={topics}
              removeTopic={removeTopic}
            />
          </Box>
        </Box>
        <SubmitBtn
          status={status}
          submitForm={submitForm}
          disabled={formState.isFormValid}
        />

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
