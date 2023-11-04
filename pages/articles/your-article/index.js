import ClientLayout from "@/components/layout/ClientsLayout";
import React, { useEffect } from "react";

function Index() {
  useEffect(() => {
    // Use a separate function for making the HTTP request and use state to store the response.
    const fetchData = async () => {
      try {
        const response = await fetch("../api/articleHandler/farhad@f");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  return <ClientLayout>gojre</ClientLayout>;
}

export default Index;
