import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function ArticlePagination({page,totalPages,setPage}) {
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <Stack spacing={1} mt={2} sx={{display:"flex",alignItems:"center"}}>
      <Pagination
        count={totalPages}
        color="secondary"
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
