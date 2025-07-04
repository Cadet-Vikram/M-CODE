import React, { useState } from 'react';
import Slider from 'react-slick';
import './HeroCarousel.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const HeroCarousel = ({ onSelect }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const featuredMovies = [
    {
      title: 'Spider-Man: Into the Spider-Verse',
      description: 'A multiverse of Spider-heroes team up to save the world.',
      thumbnail: '/assets/spiderversehero.jpg',
      videoId: 'shW9i6k8cB0',
      moreInfo: 'Miles Morales becomes Spider-Man in his universe and joins forces with other Spider-People from alternate dimensions to stop a threat to all realities.',
    },
    {
      title: 'Avengers: Endgame',
      description: 'The Avengers assemble for a final battle against Thanos.',
      thumbnail: '/assets/avengerhero.webp',
      videoId: 'TcMBFSGVi1c',
      moreInfo: 'After the devastating events of Infinity War, the Avengers reassemble and risk everything to undo the actions of Thanos and restore balance to the universe.',
    },
    {
      title: 'Interstellar',
      description: 'Explorers travel through a wormhole to save humanity.',
      thumbnail: '/assets/interstellarhero.jpg',
      videoId: 'zSWdZVtXT7E',
      moreInfo: 'With Earth becoming uninhabitable, a team of astronauts travel through a wormhole near Saturn in search of a new home for humanity.',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
  fade: true,
  cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 4800,
    pauseOnHover: false,
    arrows: true,
  };

  const handleMoreInfo = (movie) => {
    setSelectedMovie(movie);
    setShowMoreInfo(true);
  };

  return (
    <div className="hero-carousel-wrapper">
    <div className="hero-carousel">
      <Slider {...settings}>
        {featuredMovies.map((movie, index) => (
          <div key={index} className="carousel-slide">
  <div className="carousel-background">
    <img src={movie.thumbnail} alt={movie.title} className="carousel-image" />
    <div className="gradient-overlay">
      <div className="carousel-content">
        <h2 className="carousel-title">{movie.title}</h2>
        <p className="carousel-description">{movie.description}</p>
        <div className="carousel-buttons">
          <button className="btn watch-btn" onClick={() => onSelect(movie.videoId)}>
            ▶ Watch Trailer
          </button>
          <button className="btn info-btn" onClick={()=> handleMoreInfo(movie)}>ℹ More Info</button>
        </div>
      </div>
    </div>
  </div>
</div>

        ))}
      </Slider>


      <Modal show={showMoreInfo} onHide={() => setShowMoreInfo(false)} centered>
        <Modal.Header style={{backgroundColor:"black", color:"white"}} closeButton>
          <Modal.Title>{selectedMovie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"black", color:"white"}}>
          <p>{selectedMovie?.moreInfo}</p>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:"black", color:"white"}}>
          <Button variant="secondary" onClick={() => setShowMoreInfo(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onSelect(selectedMovie?.videoId)}>
            ▶ Watch Trailer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </div>  
  );
};

export default HeroCarousel;
