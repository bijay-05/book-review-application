import { api } from "./axiosInstance";
import axios from "axios";
import { generateId } from "../utils/utilityFunctions";

const uploadUrl = "https://anamikastorage.s3.amazonaws.com";

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

// const FileUploader = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     try {
//       // Step 1: Get the pre-signed URL from your backend
//       // const response = await axios.post('YOUR_BACKEND_API_URL/generate-upload-url', {
//       //   fileName: selectedFile.name,
//       //   fileType: selectedFile.type,
//       // });
//       // const { uploadUrl } = response.data;
//       const uploadUrl =
//         "https://anamikastorage.s3.ap-south-1.amazonaws.com/books";

//       // Step 2: Upload the file directly to S3 using the signed URL
//       await axios.put(uploadUrl, selectedFile, {
//         headers: {
//           "Content-Type": selectedFile.type,
//         },
//         // You can track upload progress here using onUploadProgress
//       });

//       alert("File uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("Error uploading file.");
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={!selectedFile}>
//         Upload to S3
//       </button>
//     </div>
//   );
// };
