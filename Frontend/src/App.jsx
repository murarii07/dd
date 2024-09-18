import { useState, useEffect } from "react";
import ImageNO from "./components/imageColor";
import FileUpload from "./components/Drag";
import Navbar from "./components/Navbar";
import MainCard from "./components/MainCard";
import Footer from "./components/Footer";

function App() {
  const [image, setImage] = useState([]);
  const [ColorizedImage, setColorizedImage] = useState([]);
  const handleImageChange = (acceptedFiles) => {
    const files = acceptedFiles;
    let fileURLs = [];
    for (const file of files) {
      const imageUrl = URL.createObjectURL(file);
      fileURLs.push(imageUrl);
    }
    setImage(fileURLs);
  };

  useEffect(() => {
    if (image) {
      console.log("Selected Image:", image);
    }
  }, [image]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    let fi = document.querySelector("form");
    const formData = new FormData(fi);
    console.log("ff", formData.getAll("files"));

    try {
      setColorizedImage(image);
      const res = await fetch("http://localhost:8000", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        // "data:image/png;base64," is the prefix that specifies the data is a base64-encoded PNG image
        const filear = await res.json();
        let colorizedImageArray = filear.map(
          (e) => "data:image/png;base64," + e
        );
        setColorizedImage(colorizedImageArray);
      } else {
        console.log("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <div className="text-white bg-[#507687]">
        <form
          onSubmit={(e) => handleImageUpload(e)}
          method="post"
          encType="multipart/form-data"
        >
          <Navbar />

          <MainCard />

          <div id="drag" className="flex flex-col items-center gap-2 p-20">
            <label className="font-bold text-xl" htmlFor="file">
              Select Image
            </label>
            <FileUpload handleImageChange={handleImageChange} />
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>
        {image.length ? (
          image.map((img, index) => (
            <ImageNO
              image={img}
              colorizedImage={ColorizedImage[index]}
              key={index}
            />
          ))
        ) : (
          <ImageNO image={""} colorizedImage={""} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
