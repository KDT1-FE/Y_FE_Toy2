import { apiHeader } from "./apiHeader";

export const postApi = async (apiUrl: string, requestBody: {}) => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: apiHeader,
    body: JSON.stringify(requestBody)
  });

  const data = await response.json();

  return data;
};
