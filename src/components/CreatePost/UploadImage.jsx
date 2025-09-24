import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function UploadImage({ uuid }) {
  const axiosPrivate = useAxiosPrivate();
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const abortController = new AbortController();

  async function authenticator() {
    try {
      const response = await axiosPrivate.get("/ik-auth");
      if (response.status !== 200) {
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}`
        );
      }
      const { signature, expire, token, publicKey } = response.data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  }

  async function handleUpload() {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        useUniqueFileName: false,
        file,
        fileName: uuid,

        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
      });

      console.log("Upload response:", uploadResponse);
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
    }
  }

  return (
    <>
      <input type="file" ref={fileInputRef} />
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
      <br />
      Upload progress: <progress value={progress} max={100}></progress>
    </>
  );
}
