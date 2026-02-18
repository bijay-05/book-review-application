import { api } from "./axiosInstance";
import axios from "axios";
import { generateId } from "../utils/utilityFunctions";

const uploadUrl = "https://anamikastorage.s3.amazonaws.com";

const uploadApi = axios.create({
  baseURL: uploadUrl,
});

const accessToken = window.localStorage.getItem("accessToken");

export const addNewBook = async ({
  title,
  description,
  author,
  file,
}: {
  title: string;
  description: string;
  author: string;
  file: File | undefined;
}) => {
  // upload the file to S3 bucket folder
  try {
    const fileFormat = String(file?.type.split("/")[1]);
    const fileName = `${generateId()}.${fileFormat}`;
    const uploadResponse = await uploadApi.put(`/books/${fileName}`, file, {
      headers: {
        "Content-Type": "image/*",
      },
    });
    if (uploadResponse.status !== 200) {
      alert("File upload error");
    }

    const response = await api.post(
      "/book",
      {
        title,
        description,
        authors: [author],
        images: [{ name: fileName }],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};
