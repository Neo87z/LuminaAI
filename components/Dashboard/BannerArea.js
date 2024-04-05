import Image from "next/image";
import Slider from "react-slick";

import img1 from "../../public/images/slider-bg/slider-sm-01.png";
import img2 from "../../public/images/slider-bg/slider-sm-02.png";
import img3 from "../../public/images/slider-bg/slider-sm-03.png";

const BannerArea = () => {
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    adaptiveHeight: true,
    cssEase: "linear",
  };
  return (
    <>
      <Slider
        {...settings}
        className="rainbow-slider-section slick-grid-15 rainbow-slick-dot sm-slider-carosel-activation"
      >
        
       
        
      </Slider>
    </>
  );
};

export default BannerArea;
