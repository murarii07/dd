import ImageCard from "./ImageCard";
const ImageNO= (props) => {
return(
    <div className="image-box flex justify-center gap-10 px-10">
    <ImageCard src={props.image} alt={"original image"} title={"Original Image"} />
    <ImageCard src={props.colorizedImage || ""} alt={"Colorized image"} title={"Colorized Image"} />
  </div>
)
  };
  
  export default ImageNO;
  