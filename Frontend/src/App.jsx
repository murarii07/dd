import { useState, useEffect } from "react";
import ImageNO from "./components/imageColor";
import FileUpload from "./components/Drag";
import Navbar from "./components/Navbar";
// import MainCard from "./components/MainCard";
import Footer from "./components/Footer";

function App() {
  //  function base64ToBlob(base64, mimeType) {
  //   // Remove the base64 prefix if it exists
  //   const byteCharacters = atob(base64);
  //   const byteNumbers = new Array(byteCharacters.length);
  
  //   // Convert each character to a byte number
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   // Convert the byte array to a Uint8Array
  //   const byteArray = new Uint8Array(byteNumbers);
  
  //   // Create the Blob
  //   return new Blob([byteArray], { type: mimeType });
  // }
  // const [colorizedImageData,setColorizedImageData]=useState([])
  const [image, setImage] = useState([]);
  const [ColorizedImage, setColorizedImage] = useState([]);
  const handleImageChange = (acceptedFiles) => {
    setImage(acceptedFiles.map(file=>URL.createObjectURL(file)));
  };

  useEffect(() => {
    if (image) {
      console.log("Selected Image:", image);
    }
  }, [image]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    let form=document.querySelector('form');
    const formData = new FormData(form);
    console.log("ff",formData.getAll('files'))

    try {
      const api_url=import.meta.env.VITE_API_URL
      setColorizedImage(image);
      const res = await fetch(api_url, {
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
  // const f=()=>{
  //   const clipboardItem = new ClipboardItem({ 'image/png': colorizedImageData[0] });
  //  navigator.clipboard.write([clipboardItem])
  // }
  // useEffect(() => {
  //     console.log("Colorized Image Data:", colorizedImageData);
  // }, [colorizedImageData]);

  return (

    <>
      <div className="text-white bg-[#507687]">
        <form
          onSubmit={handleImageUpload}
          method="post"
          encType="multipart/form-data"
        >
          <Navbar />

          {/* <MainCard /> */}

          <div id="drag" className="flex flex-col items-center gap-2 p-20">
            <label className="font-bold text-xl" htmlFor="file">
              Select Image
            </label>
            <FileUpload handleImageChange={handleImageChange} />
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
            >
              colorized
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
