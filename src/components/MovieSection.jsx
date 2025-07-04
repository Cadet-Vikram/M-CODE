import React, { useState } from 'react';
import Slider from 'react-slick';
import './MovieSection.css';
import { useNavigate } from 'react-router-dom';

const MovieSection = ({ title, movies, onSelect }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    swipe: true,
    touchMove: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  const handleCardClick = (movie) => {
    const movieSlug = movie.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/movie/${movieSlug}`);
  };

  const handleImageHover = (index) => {
    setHoveredIndex(index);
  };

  const handleImageLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="my-4 px-4 movie-section-wrapper">
      <h3 className="text-white mb-3">{title}</h3>
      <Slider {...settings}>
        {movies.map((movie, i) => (
          <div className="movie-slide" key={i}>
            <div
              className={`hover-card ${hoveredIndex === i ? 'active' : ''}`}
             
            >
              <div
    className="hover-area"
    onMouseEnter={() => handleImageHover(i)}
    onMouseLeave={handleImageLeave}
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    <div 
                className="thumbnail-wrapper" 
                onClick={() => handleCardClick(movie)}
              >
                <img
                  src={movie.thumbnail}
                  alt={movie.title || 'Movie'}
                  className="movie-thumbnail"
                />
                {movie.badge && <span className="movie-badge">{movie.badge}</span>}
              </div>
              <div className="movie-info">
                <h5
                  className="movie-title"
                >
                  {movie.title}
                </h5>
                <p>{movie.description}</p>
                <button
                  className="watch-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(movie.videoId);
                  }}
                >
                  ▶ Watch Now
                </button>
              </div>
            </div>
  </div>
              
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieSection;