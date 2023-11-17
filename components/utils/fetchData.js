export async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data.articles; // Assuming your data structure has an 'articles' property
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
}
