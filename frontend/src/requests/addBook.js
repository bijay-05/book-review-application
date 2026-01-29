import { api } from "./axiosInstance";
import axios from "axios";
import { generateId } from "../utils/utilityFunctions";

const uploadUrl = "https://<bucketname>.s3.amazonaws.com";

const uploadApi = axios.create({
  baseURL: uploadUrl,
});

export const addNewBook = async ({
  title,
  description,
  author,
  categoryId,
  file,
}) => {
  // upload the file to S3 bucket folder
  const fileFormat = String(file.type.split("/")[1]);
  const fileName = `${generateId()}.${fileFormat}`;
  const uploadResponse = await uploadApi.put(`/books/${fileName}`, file, {
    headers: {
      "Content-Type": "image/*",
    },
  });
  if (uploadResponse.status !== 200) {
    alert("File upload error");
  }

  const response = await api.post("/book", {
    title,
    description,
    author,
    categoryId,
    fileName,
  });
  console.log("Response of book record creation: ", response.data);
};
