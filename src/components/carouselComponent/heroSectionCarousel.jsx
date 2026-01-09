import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow } from "./nextArrow";
import { PrevArrow } from "./previousArrow";
import heroSection1 from '../../assets/heroSection1.jpg'
import heroSection2 from '../../assets/heroSection2.jpg'
import heroSection3 from '../../assets/heroSection3.jpg'
import heroSection4 from '../../assets/heroSection4.jpg'
import heroSection5 from '../../assets/heroSection5.jpg'


const HeroSectionCarousel = () => {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    swipe: true,
    infinite: true,
    speed: 500,

    slidesToShow: 3,        // DEFAULT → laptop / desktop
    slidesToScroll: 1,      // SAME for all screens

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1024,   // tablets & below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,    // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const heroSection = [heroSection1, heroSection2, heroSection3, heroSection4, heroSection5
  ]

  return (
    <div className="slider-container relative mt-4">
      <Slider {...settings} className="hero-slick">
        {heroSection.map((img, index) => {
          return (<div key={index} className="lg:px-2 lg:h-[60vh]  ">
            <img src={img} alt="" className=" h-full  w-full object-center" />
          </div>)
        })}
      </Slider>
    </div>
  );
}

export default HeroSectionCarousel;
