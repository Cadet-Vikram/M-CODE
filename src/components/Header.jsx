import React from 'react';
import MovieSearch from './MovieSearch';

const Header = ({ movies }) => {
  return (
    <div className="header-container" style={{backgroundColor:"rgb(0, 0, 0)", borderBottom: '2px solid goldenrod'}}>
      <div className="header-content" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '20px',
        gap: '20px'
      }}>
        
        <h1 style={{ 
          fontFamily: "Amaranth, sans-serif",
          fontWeight: '700', 
          fontSize: '2rem', 
          color: '#fff',
          margin: '0'
        }}>
          MCODE
        </h1>
        
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <MovieSearch movies={movies} />
        </div>
      </div>
      
       <style>{`
        @media (max-width: 768px) {
          .header-content {
            padding: 15px !important;
            gap: 15px !important;
          }
          
          h1 {
            font-size: 1.5rem !important;
          }
        }
        
        @media (min-width: 769px) {
          .header-content {
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .header-content > div {
            max-width: 400px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;