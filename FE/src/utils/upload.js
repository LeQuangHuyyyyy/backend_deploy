export const uploadImageToCloudinary = async (file) => {
  try {
    if (!file) return null;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "SWP392"); // Upload Preset phải được tạo trước trên Cloudinary

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dur2ihrqo/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();

    if (result.secure_url) {
      console.log("Uploaded Image URL:", result.secure_url);
      return result.secure_url;
    } else {
      console.error("Upload failed:", result);
      return null;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};
