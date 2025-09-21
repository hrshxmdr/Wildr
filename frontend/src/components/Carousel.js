// src/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import campsites from '../pages/campsites'; // normalized export

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {campsites.map((campsite) => (
          <div key={campsite.id} className="carousel-slide">
            <img src={campsite.coverImage || campsite.images?.[0]?.url} alt={campsite.name} className="carousel-image" />
            <div className="carousel-content">
              <h2 className="carousel-title">{campsite.name}</h2>
              <p className="carousel-description">{campsite.description}</p>
            </div>
          </div>
        ))}
      </Slider>
      <style jsx>{`
        .carousel-container {
          position: relative;
          height: 100vh;
          width: 100%;
        }
        .carousel-slide {
          position: relative;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .carousel-content {
          position: absolute;
          bottom: 20px;
          left: 20px;
          color: white;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 10px;
          border-radius: 5px;
        }
        .carousel-title {
          font-size: 24px;
          margin: 0;
        }
        .carousel-description {
          margin: 10px 0 0;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
