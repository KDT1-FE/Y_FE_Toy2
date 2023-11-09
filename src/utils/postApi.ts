import axios from "axios";
import { apiHeader } from "./apiHeader";

export const postApi = async (apiUrl: string, requestBody: {}) => {
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: apiHeader
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
