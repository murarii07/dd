import { useState, useEffect } from "react";
import ImageNO from "./components/imageColor";
import FileUpload from "./components/Drag";

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
      const res = await fetch("http://localhost:8000", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        // "data:image/png;base64," is the prefix that specifies the data is a base64-encoded PNG image
        const filear = await res.json();
        // setColorizedImageData(filear.map(x=>
        //   base64ToBlob(x)))
        let colorizedImageArray=filear.map(imageData=>"data:image/png;base64,"+imageData)
        setColorizedImage(colorizedImageArray)
        

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
   
    <div className="text-white">
      <div className="text-2xl p-4 font-bold text-blue-500 shadow-2xl bg-black">
        SAR IMAGE COLORIZATION
      </div>
      <form onSubmit={(e)=>handleImageUpload(e)} method="post" encType="multipart/form-data"> 
      <div className="flex flex-col items-center gap-2 p-20">
        {/* <label className="font-semibold text-xl" htmlFor="file">
          Select Image
        </label> */}
        <FileUpload handleImageChange={handleImageChange} />
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
           type="submit"
        >
          Colorize
        </button>
      </div>
      </form>
        {image.length?
        image.map((img,index)=><ImageNO image={img} colorizedImage={ColorizedImage[index]} key={index}/>
      )
          :<ImageNO image={""} colorizedImage={""} />
        }
     
    </div>
  );
}

export default App;
