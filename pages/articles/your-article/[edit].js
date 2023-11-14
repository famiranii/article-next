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

function Index({ singleArticle }) {
  const article = singleArticle[0];
  console.log(article);
  const router = useRouter();
  const [status, setStatus] = useState("none");
  const [topics, setTopics] = useState(article.topics);
  const [formState, getInputInfo] = UseForm(
    {
      title: { value: article.title, isValid: false },
      description: { value: article.description, isValid: false },
      text: { value: article.text, isValid: false },
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
      id: article._id,
    };
    try {
      const response = await fetch("../../api/articleHandler", {
        method: "PUT",
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
          margin: { sm: 2 },
          minHeight: "85vh",
          padding: 2,
        }}
      >
        <Box
          sx={{ display: { md: "flex" }, justifyContent: "space-between" }}
          component="form"
        >
          <Box sx={{ width: { md: 2 / 3 } }}>
            <AddArticleInput
              inputValue={formState.inputValue.title.value}
              id="title"
              minRows={1}
              placeHolder="minimum length is 10"
              getInputInfo={getInputInfo}
              validation={[minValidator(10)]}
            />
            <AddArticleInput
              inputValue={formState.inputValue.description.value}
              id="description"
              minRows={2}
              placeHolder="minimum length is 25"
              getInputInfo={getInputInfo}
              validation={[minValidator(25)]}
            />
            <AddArticleInput
              inputValue={formState.inputValue.text.value}
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

async function fetchData(title) {
  const response = await fetch(
    `http://localhost:3000/api/articleHandler/articleByTitle/${title}`
  );

  if (response.ok) {
    const data = await response.json();
    return data.singleArticle || {};
  } else {
    const errorMessage = `Failed to fetch data. Status: ${response.status}`;
    throw new Error(errorMessage);
  }
}

export async function getServerSideProps(context) {
  const title = context.params.edit;

  try {
    const singleArticle = await fetchData(title);

    if (!singleArticle) {
      return {
        notFound: true,
      };
    }

    return {
      props: { singleArticle },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      props: { error: error.message },
    };
  }
}

export default Index;
