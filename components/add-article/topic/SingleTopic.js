import { Chip } from "@mui/material";
export default function Slug({ topic, deleteTopic }) {
  const handleDelete = () => {
    deleteTopic(topic);
  };
  return (
    <Chip
      label={topic}
      variant="outlined"
      onDelete={handleDelete}
      size="larg"
      sx={{ margin: 0.5, padding: 0.5 }}
    />
  );
}
