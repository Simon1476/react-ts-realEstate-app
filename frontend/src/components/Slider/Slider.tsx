import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./slider.scss";
import {
  faArrowLeft,
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Slider = ({ images }: { images: string[] }) => {
  const [imageIndex, setImageIndex] = useState(-1);

  const handleChangeSlide = (direction: string) => {
    if (direction === "Left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };
  return (
    <div className="slider">
      {imageIndex !== -1 && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => handleChangeSlide("Left")}>
            <FontAwesomeIcon className="icon" icon={faArrowLeft} />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="arrow" onClick={() => handleChangeSlide("Right")}>
            <FontAwesomeIcon className="icon" icon={faArrowRight} />
          </div>
          <div className="close" onClick={() => setImageIndex(-1)}>
            <FontAwesomeIcon className="icon" icon={faXmark} />
          </div>
        </div>
      )}

      <div className="bigImage">
        <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt=""
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
