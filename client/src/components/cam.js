import React, { useRef, useState } from "react";
import axios from "axios";

const PhotoCapture = () => {
  const webcamRef = useRef(null);
  const [streamReady, setStreamReady] = useState(false);

  const capturePhoto = async () => {
    if (webcamRef.current && streamReady) {
      const webcamElement = webcamRef.current.video;
      const photoData = new FormData();

      // Convert the captured photo to a Blob and append it to the FormData
      const canvas = document.createElement("canvas");
      canvas.width = webcamElement.width;
      canvas.height = webcamElement.height;
      const context = canvas.getContext("2d");
      context.drawImage(webcamElement, 0, 0, webcamElement.width, webcamElement.height);
      canvas.toBlob((blob) => {
        photoData.append("photo", blob, "captured_photo.png");

        // Send the photo data to the backend server
        axios
          .post("http://localhost:3001/api/upload", photoData)
          .then((response) => {
            console.log(response.data.message);
          })
          .catch((error) => {
            console.error(error);
          });
      }, "image/png");
    }
  };

  const handleLoadedData = () => {
    setStreamReady(true);
  };

  return (
    <div>
      <video ref={webcamRef} autoPlay onLoadedData={handleLoadedData}></video>
      <button onClick={capturePhoto}>Capture Photo</button>
    </div>
  );
};

export default PhotoCapture;
