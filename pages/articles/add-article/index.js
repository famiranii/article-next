import ClientLayout from "@/components/layout/ClientsLayout";
import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import Topics from "@/components/add-article/Topics";
import Notification from "@/components/notifications/Notification";
import SubmitBtn from "@/components/buttons/SubmitBtn";
import AddArticleInput from "@/components/inputs/AddArticleInput";
import UseForm from "@/components/hook/useForm";
import { minValidator } from "@/components/validator/Rules";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
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
        router.push("/articles/your-article");
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
      <Paper
        sx={{
          borderRadius: 2,
          margin: {sm:2},
          minHeight: "80vh",
          padding: 2,
        }}
      >
        <Box
          sx={{ display: { md: "flex" }, justifyContent: "space-between" }}
          component="form"
        >
          <Box sx={{ width: { md: 2 / 3 } }}>
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
          <Box sx={{ width: { sm: 1 / 2, md: 1 / 4 }, mt: 2 }}>
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
