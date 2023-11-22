import { useState } from "react";

function useArticlePagination({ totalItems, articles }) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = articles.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return [totalPages,currentPage,currentItems, handlePageChange];
}

export default useArticlePagination;
