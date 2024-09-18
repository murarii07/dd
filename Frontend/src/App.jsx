import { useState, useEffect } from "react";
import ImageNO from "./components/imageColor";
import FileUpload from "./components/Drag";

function App() {
  const [image, setImage] = useState([]);
  const [ColorizedImage, setColorizedImage] = useState([]);
  const handleImageChange = (acceptedFiles) => {
    const files = acceptedFiles
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
    let fi=document.querySelector('form');
    const formData = new FormData(fi);
    console.log("ff",formData.getAll('files'))

    try {
      const res = await fetch("http://localhost:8000", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        // "data:image/png;base64," is the prefix that specifies the data is a base64-encoded PNG image
        const filear = await res.json();
        let colorizedImageArray=filear.map(e=>"data:image/png;base64,"+e)
        setColorizedImage(colorizedImageArray)

      } else {
        console.log("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  
  };

  return (
   
    <div className="text-white">
      <form onSubmit={(e)=>handleImageUpload(e)} method="post" encType="multipart/form-data"> 
      <div className="text-2xl p-4 font-bold text-blue-500 shadow-2xl bg-black">
        SAR IMAGE COLORIZATION
      </div>
      <div className="flex flex-col items-center gap-2 p-20">
        <label className="font-semibold text-xl" htmlFor="file">
          Select Image
        </label>
        <FileUpload handleImageChange={handleImageChange} />
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
           type="submit"
        >
          Colorize
        </button>
      </div>
      </form>
        {image.length?image.map((img,index)=><ImageNO image={img} colorizedImage={ColorizedImage[index]} key={index}/>)
          :<ImageNO image={""} colorizedImage={""} />
        }
      
    </div>
  );
}

export default App;
