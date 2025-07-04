import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieSearch.css';

const MovieSearch = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const resultsRef = useRef(null);


  const allMovies = React.useMemo(() => Object.values(movies || {}).flat(), [movies]);
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filteredMovies = allMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredMovies);
    setShowResults(true);
  }, [searchTerm, allMovies]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMovieClick = (movie) => {
    const movieSlug = movie.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/movie/${movieSlug}`);
    setShowResults(false);
    setSearchTerm('');
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div className="movie-search-container">
      <div className="search-input-wrapper" ref={searchRef}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
          className="movie-search-input"
        />
        <div className="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
      </div>

      {showResults && (
        <div className="search-results" ref={resultsRef}>
          {searchResults.length > 0 ? (
            <div className="results-list">
              {searchResults.map((movie, index) => (
                <div 
                  key={index}
                  className="search-result-item"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img 
                    src={movie.thumbnail} 
                    alt={movie.title}
                    className="result-thumbnail"
                  />
                  <div className="result-info">
                    <h6 className="result-title">{movie.title}</h6>
                    <p className="result-description">
                      {movie.description.length > 60 
                        ? `${movie.description.substring(0, 60)}...` 
                        : movie.description
                      }
                    </p>
                    {movie.badge && (
                      <span className="result-badge">{movie.badge}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🎬</div>
              <p>No movies found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch; 