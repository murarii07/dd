import ImageCard from "./ImageCard";
const ImageNO= (props) => {
return(
    <div className="image-box flex justify-center gap-10 px-10">
    <ImageCard src={props.image} alt={"original image"} title={"Original Image"} />
    <ImageCard src={props.colorizedImage || ""} alt={"Colorized image"} title={"Colorized Image"} 
    element={ <a href={props.colorizedImage} download={"colorized image"}><button className="nline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700" >
   &#x2193;
  </button>
  </a>}
    />
  </div>
)
  };
  
  export default ImageNO;
  