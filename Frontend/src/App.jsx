import { useState, useEffect } from "react";
import ImageNO from "./components/imageColor";

function App() {
  const [imageNo,setImageNo]=useState({})
  const [image, setImage] = useState("");
  const [ColorizedImage, setColorizedImage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
   
    setImageNo({imageNo,[file.name]:URL.createObjectURL(file)});
    setImage(URL.createObjectURL(file));
    console.log("df",imageNo)
  }

  useEffect(() => {
    if (image) {
      console.log("Selected Image:", image);
    }
  }, [image]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    let c= document.querySelector('form')
    const formData = new FormData(c);

    try {
      const res = await fetch("http://localhost:8000", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const blob = await res.blob();
        const e =  URL.createObjectURL(blob);
        console.log(e)
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
      <form onSubmit={(e)=>handleImageUpload(e)} method="post" encType="multipart/form-data"> 
      <div className="text-2xl p-4 font-bold text-blue-500 shadow-2xl bg-black">
        SAR IMAGE COLORIZATION
      </div>
      <div className="flex flex-col items-center gap-2 p-20">
        <label className="font-semibold text-xl" htmlFor="file">
          Select Image
        </label>
        <input className="pl-20" name="file" type="file" id="file" onChange={handleImageChange} />
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
           type="submit"
        >
          Colorize
        </button>
      </div>
      </form>
      <ImageNO image={image} colorizedImage={ColorizedImage} />
    </div>
  );
}

export default App;
