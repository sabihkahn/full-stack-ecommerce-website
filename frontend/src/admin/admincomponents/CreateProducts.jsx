import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function CreateProducts() {
  const [dataURL, setDataURL] = useState(null);
  const [uploadedURL, setUploadedURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Dropzone setup
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setDataURL(reader.result); // Preview
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Upload to Cloudinary
  const uploadImage = async () => {
    if (!selectedFile) return;

    let formData = new FormData();
    formData.append("file", selectedFile);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setUploadedURL(data.secure_url);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Product Image</h2>

      {dataURL ? (
        <div className="space-y-4">
          <img
            src={dataURL}
            alt="Preview"
            className="w-64 h-64 object-cover rounded-lg shadow-md"
          />

          <div className="flex gap-3">
            {uploadedURL ? (
              <span className="text-green-600 font-medium">Uploaded!</span>
            ) : (
              <button
                onClick={uploadImage}
                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
              >
                Upload
              </button>
            )}
            <button
              onClick={() => {
                setDataURL(null);
                setSelectedFile(null);
                setUploadedURL(null);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded shadow hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-400 p-10 rounded-lg cursor-pointer text-center hover:bg-gray-50"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-600">Drop the files here...</p>
          ) : (
            <p className="text-gray-600">Drag & drop or click to browse</p>
          )}
        </div>
      )}

      {uploadedURL && (
        <div className="mt-4">
          <p className="text-gray-700">Image URL:</p>
          <a
            href={uploadedURL}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            {uploadedURL}
          </a>
        </div>
      )}
    </div>
  );
}
