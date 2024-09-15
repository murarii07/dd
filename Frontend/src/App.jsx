import ImageCard from "./components/ImageCard";
import { useState, useEffect } from "react";

function App() {
  const [image, setImage] = useState("");
  const [ColorizedImage, setColorizedImage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (image) {
      console.log("Selected Image:", image);
    }
  }, [image]);

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("http://192.168.43.157:8000", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
      if (res.ok) {
        const blob = await res.blob();
        const e = URL.createObjectURL(blob);
        setColorizedImage(e);
      } else {
        console.log("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="bg-black h-full text-white bg-gradient-to-b from-black to-gray-900">
      <div className="text-2xl p-4 font-bold text-blue-500 shadow-2xl bg-black">
        SAR IMAGE COLORIZATION
      </div>
      <div className="flex flex-col items-center gap-2 p-20">
        <label className="font-semibold text-xl" htmlFor="file">
          Select Image
        </label>
        <input className="pl-20" type="file" id="file" onChange={handleImageChange} />
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          onClick={handleImageUpload}
        >
          Upload
        </button>
      </div>
      <div className="flex justify-center gap-10 px-10">
        <ImageCard src={image} alt={"original image"} title={"Original Image"} />
        <ImageCard src={ColorizedImage} alt={"Colorized image"} title={"Colorized Image"} />
      </div>
    </div>
  );
}

export default App;
