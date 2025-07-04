import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import VideoModal from '../components/VideoModal';
import './MovieDetail.css';

const MovieDetail = ({ movies }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1025);


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1025);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const currentMovie = useMemo(() => {
    const allMovies = Object.values(movies || {}).flat();
    const movieSlug = id;
    return allMovies.find(movie => 
      movie.title.toLowerCase().replace(/\s+/g, '-') === movieSlug
    );
  }, [id, movies]);


  const otherMovies = useMemo(() => {
    const allMovies = Object.values(movies || {}).flat();
    return allMovies.filter(movie => 
      movie.title.toLowerCase().replace(/\s+/g, '-') !== id
    );
  }, [id, movies]);


  const CustomPrevArrow = ({ onClick }) => (
    <div
      className="custom-arrow custom-prev-arrow"
      onClick={onClick}
      style={{
        position: 'absolute',
        left: isDesktop ? '-60px' : '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 2,
        transition: 'all 0.3s ease',
      }}
    >
      <span style={{ color: '#fff', fontSize: '64px', fontWeight: 'bold', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>‹</span>
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div
      className="custom-arrow custom-next-arrow"
      onClick={onClick}
      style={{
        position: 'absolute',
        right: isDesktop ? '-60px' : '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 2,
        transition: 'all 0.3s ease',
      }}
    >
      <span style={{ color: '#fff', fontSize: '64px', fontWeight: 'bold' }}>›</span>
    </div>
  );

  const sliderSettings = {
    dots: false,
    infinite: otherMovies.length > 5,
    speed: 500,
    slidesToShow: Math.min(5, otherMovies.length),
    slidesToScroll: 2,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    swipe: true,
    touchMove: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(4, otherMovies.length) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(2, otherMovies.length) } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  const handleCardClick = (movie) => {
    const movieSlug = movie.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/movie/${movieSlug}`);
  };

  const handleWatchNow = (e, videoId) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVideoId(videoId);
    setShowModal(true);
  };

  const handleHeroWatchNow = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  if (!currentMovie) {
    return (
      <div className="movie-detail-container" style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '20px' }}>
        <div className="text-center">
          <h2>Movie not found</h2>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail-container" style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      <div className="movie-hero" style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${currentMovie.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 20px',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="row align-items-center">
            <div className="col-md-4">
              <img 
                src={currentMovie.thumbnail} 
                alt={currentMovie.title}
                style={{ 
                  width: '100%', 
                  maxWidth: '300px', 
                  borderRadius: '10px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                }}
              />
            </div>
            <div className="col-md-8" style={{ textAlign: 'left', paddingLeft: '40px' }}>
              <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>
                {currentMovie.title}
              </h1>
              {currentMovie.badge && (
                <span style={{
                  backgroundColor: '#ffd700',
                  color: '#000',
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  display: 'inline-block'
                }}>
                  {currentMovie.badge}
                </span>
              )}
              <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px' }}>
                {currentMovie.description}
              </p>
              {currentMovie.moreInfo && (
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '30px', opacity: 0.8 }}>
                  {currentMovie.moreInfo}
                </p>
              )}
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleHeroWatchNow(currentMovie.videoId)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '25px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                >
                  ▶ Watch Now
                </button>
                <button
                  onClick={() => navigate('/')}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#fff',
                    border: '2px solid #fff',
                    padding: '12px 30px',
                    borderRadius: '25px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#fff';
                    e.target.style.color = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#fff';
                  }}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {otherMovies.length > 0 && (
        <div className="related-movies-section" style={{ padding: '60px 20px', position: 'relative' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            <h3 style={{ color: '#fff', marginBottom: '30px', fontSize: '2rem' }}>
              More Movies You Might Like
            </h3>
            
            <Slider {...sliderSettings}>
              {otherMovies.map((movie, i) => (
                <div className="movie-slide" key={i} style={{ padding: '0 10px' }}>
                  <div
                    className="movie-card-wrapper"
                    style={{
                      position: 'relative',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => isDesktop && setHoveredIndex(i)}
                    onMouseLeave={() => isDesktop && setHoveredIndex(null)}
                  >

                    <div 
                      className="movie-image-container"
                      onClick={() => handleCardClick(movie)}
                      style={{
                        position: 'relative',
                        transform: (isDesktop && hoveredIndex === i) ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                        zIndex: (isDesktop && hoveredIndex === i) ? 10 : 1,
                        border:"3px solid goldenrod",
                        borderRadius:"10px"
                      }}
                    >
                      <img
                        src={movie.thumbnail}
                        alt={movie.title || 'Movie'}
                        style={{
                          width: '100%',
                          height: '300px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          display: 'block'
                        }}
                      />
                      {movie.badge && (
                        <span style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: '#ffd700',
                          color: '#000',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          zIndex: 5
                        }}>
                          {movie.badge}
                        </span>
                      )}
                    </div>
                    
                    {isDesktop && (
                      <div 
                        className="movie-info-section"
                        style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '0',
                          right: '0',
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.95))',
                          padding: '30px 15px 15px',
                          borderRadius: '0 0 10px 10px',
                          transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(100%)',
                          opacity: hoveredIndex === i ? 1 : 0,
                          visibility: hoveredIndex === i ? 'visible' : 'hidden',
                          transition: 'all 0.3s ease',
                          zIndex: 15,
                          pointerEvents: hoveredIndex === i ? 'auto' : 'none'
                        }}
                      >
                        <h5 style={{ 
                          color: '#fff', 
                          fontSize: '1rem', 
                          marginBottom: '8px',
                          fontWeight: 'bold'
                        }}>
                          {movie.title}
                        </h5>
                        <p style={{ 
                          color: '#ccc', 
                          fontSize: '0.8rem', 
                          marginBottom: '12px',
                          lineHeight: '1.3'
                        }}>
                          {movie.description.length > 60 
                            ? `${movie.description.substring(0, 60)}...` 
                            : movie.description
                          }
                        </p>
                        <button
                          onClick={(e) => handleWatchNow(e, movie.videoId)}
                          onMouseDown={(e) => e.stopPropagation()}
                          style={{
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            zIndex: 25,
                            position: 'relative'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#c82333';
                            e.target.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#dc3545';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          ▶ Watch Now
                        </button>
                      </div>
                    )}

                    {!isDesktop && (
                      <div 
                        className="mobile-info-section"
                        style={{
                          padding: '15px',
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          borderRadius: '0 0 10px 10px',
                          minWidth:"100px"
                        }}
                      >
                        <h5 style={{ 
                          color: '#fff', 
                          fontSize: '1rem', 
                          marginBottom: '8px',
                          fontWeight: 'bold'
                        }}>
                          {movie.title}
                        </h5>
                        <p style={{ 
                          color: '#ccc', 
                          fontSize: '0.8rem', 
                          marginBottom: '12px',
                          lineHeight: '1.3'
                        }}>
                          {movie.description.length > 60 
                            ? `${movie.description.substring(0, 60)}...` 
                            : movie.description
                          }
                        </p>
                        <button
                          onClick={(e) => handleWatchNow(e, movie.videoId)}
                          style={{
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                        >
                          ▶ Watch Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      <VideoModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        videoId={selectedVideoId}
      />
    </div>
  );
};

export default MovieDetail;