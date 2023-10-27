import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./topices.module.css";
import SingleTopic from "./topic/SingleTopic";

function Topics({ dispatchTopics }) {
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState("");

  const addSlug = () => {
    const allTopics = [...topics, topic];
    setTopics(allTopics);
    setTopic("");
    dispatchTopics(allTopics);
  };

  const deleteTopic = (deletedTopic) => {
    setTopics(topics.filter((topic) => topic !== deletedTopic));
    dispatchTopics(topics);
  };
  return (
    <>
      <div className={styles.topic}>
        <TextField
          label="topics"
          color="navyBlue"
          rows={5}
          fullWidth
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
        />
        <Fab
          color="secondary"
          aria-label="add"
          size="small"
          className={styles.fab}
          onClick={addSlug}
        >
          <AddIcon />
        </Fab>
      </div>
      <div className={styles.showSlug}>
        {topics.map((topic, index) => (
          <SingleTopic key={index} topic={topic} deleteTopic={deleteTopic} />
        ))}
      </div>
    </>
  );
}

export default Topics;
