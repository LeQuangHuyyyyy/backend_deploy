import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { useRef, useState } from "react";

// UploadExample component demonstrates file uploading using ImageKit's React SDK.
const UploadExample = ({ onFileChange }) => {
  // State to keep track of the current upload progress (percentage)
  //const [progress, setProgress] = useState(0);

  // Create a ref for the file input element to access its files easily
  const fileInputRef = useRef(null);

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  //const abortController = new AbortController();

  // State to keep track of the preview URL
  const [previewUrl, setPreviewUrl] = useState("");

  /**
   * Authenticates and retrieves the necessary upload credentials from the server.
   *
   * This function calls the authentication API endpoint to receive upload parameters like signature,
   * expire time, token, and publicKey.
   *
   * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
   * @throws {Error} Throws an error if the authentication request fails.
   */
  //   const authenticator = async () => {
  //     try {
  //       // Perform the request to the upload authentication endpoint.
  //       const response = await api.get("/auth");
  //       //   if (!response.ok) {
  //       //       // If the server response is not successful, extract the error text for debugging.
  //       //       const errorText = await response.text();
  //       //       throw new Error(`Request failed with status ${response.status}: ${errorText}`);
  //       //   }

  //       // Parse and destructure the response JSON for upload credentials.
  //       //const data = await response.json();
  //       const { signature, expire, token, publicKey } = response.data;
  //       return { signature, expire, token, publicKey };
  //     } catch (error) {
  //       // Log the original error for debugging before rethrowing a new error.
  //       console.error("Authentication error:", error);
  //       throw new Error("Authentication request failed");
  //     }
  //   };

  /**
   * Handles the file upload process.
   *
   * This function:
   * - Validates file selection.
   * - Retrieves upload authentication credentials.
   * - Initiates the file upload via the ImageKit SDK.
   * - Updates the upload progress.
   * - Catches and processes errors accordingly.
   */
  // const handleUpload = async () => {
  //   // Access the file input element using the ref
  //   const fileInput = fileInputRef.current;
  //   if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
  //     alert("Please select a file to upload");
  //     return;
  //   }

  //   // Extract the first file from the file input
  //   const file = fileInput.files[0];
  //   onFileChange(file);
  //   // Retrieve authentication parameters for the upload.
  // let authParams;
  // try {
  //   authParams = await authenticator();
  // } catch (authError) {
  //   console.error("Failed to authenticate for upload:", authError);
  //   return;
  // }
  // const { signature, expire, token, publicKey } = authParams;

  // // Call the ImageKit SDK upload function with the required parameters and callbacks.
  // try {
  //   const uploadResponse = await upload({
  //     // Authentication parameters
  //     expire,
  //     token,
  //     signature,
  //     publicKey,
  //     file,
  //     fileName: file.name, // Optionally set a custom file name
  //     // Progress callback to update upload progress state
  //     // onProgress: (event) => {
  //     //   setProgress((event.loaded / event.total) * 100);
  //     // },
  //     // Abort signal to allow cancellation of the upload if needed.
  //     abortSignal: abortController.signal,
  //   });
  //   console.log("Upload response:", uploadResponse);
  // } catch (error) {
  //   // Handle specific error types provided by the ImageKit SDK.
  //   if (error instanceof ImageKitAbortError) {
  //     console.error("Upload aborted:", error.reason);
  //   } else if (error instanceof ImageKitInvalidRequestError) {
  //     console.error("Invalid request:", error.message);
  //   } else if (error instanceof ImageKitUploadNetworkError) {
  //     console.error("Network error:", error.message);
  //   } else if (error instanceof ImageKitServerError) {
  //     console.error("Server error:", error.message);
  //   } else {
  //     // Handle any other errors that may occur.
  //     console.error("Upload error:", error);
  //   }
  // }
  //};

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    const file = files[0];
    setPreviewUrl(URL.createObjectURL(file)); // Hiển thị preview
    onFileChange(file); // Gửi file về component cha
  };

  //   {/* <div style={{ marginTop: 16 }}>
  //     <span style={{ fontWeight: 500 }}>Upload progress:</span>
  //     <div
  //       style={{
  //         background: "#f0f0f0",
  //         borderRadius: 8,
  //         height: 16,
  //         width: "100%",
  //         margin: "8px 0",
  //         overflow: "hidden",
  //         boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
  //       }}
  //     >
  //       <div
  //         style={{
  //           height: "100%",
  //           width: `${progress}%`,
  //           background: "#52c41a",
  //           transition: "width 0.3s",
  //         }}
  //       />
  //     </div>
  //     <span style={{ fontSize: 14 }}>{Math.round(progress)}%</span>
  //   </div> */}
  // </div>
  return (
    <>
      {previewUrl && (
        <video
          src={previewUrl}
          controls
          style={{
            width: "100%",
            maxHeight: 220,
            marginBottom: 16,
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        />
      )}
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{
          marginBottom: 16,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      {/* <button
        type="button"
        onClick={handleUpload}
        style={{
          background: "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "8px 24px",
          fontWeight: 600,
          fontSize: 16,
          cursor: "pointer",
          marginBottom: 24,
        }}
      >
        Upload file
      </button> */}
    </>
  );
};

export default UploadExample;
