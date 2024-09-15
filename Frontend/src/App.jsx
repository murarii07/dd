import ImageCard from "./components/ImageCard";
import { useState } from "react";

function App() {
  const [image, setImage] = useState("");
  const [ColorizedImage, setColorizedImage] = useState("");


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    console.log(image)
  }

  const handleImageUpload = async () => {
    //api call 
    const formData = new FormData();
    formData.append("file", image);
    
    const res=await fetch("http://192.168.43.157:8000",{method:'POST', mode: 'cors', body:formData})
    if(res.ok){
      const blob=await res.blob();
      const e=URL.createObjectURL(blob);
      setColorizedImage(e);
    }
    else{
      //testing
      console.log(false)
    }

  }
  return (
    
    <div className="bg-black h-full text-white bg-gradient-to-b from-black to-gray-900">
      <div className="text-2xl p-4 font-bold text-blue-500 shadow-2xl bg-black">SAR IMAGE COLORIZARION</div>
      <div className="flex flex-col items-center gap-2 p-20">
      <label className="font-semibold text-xl"  htmlFor="file">
        Select Image
      </label>
      <input className="pl-20" type="file" id="file" onChange={handleImageChange}></input>
      <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700" onClick={handleImageUpload}>
        upload
      </button>
    </div>
      <div className="flex justify-center gap-10  px-10">
        <ImageCard src={image} alt={"original image"} title={"Original Image"}/>
        <ImageCard src={ColorizedImage} alt={"Colorized image"} title={"Colorized Image"}/>
      </div>
    </div>
  );
}

export default App;
