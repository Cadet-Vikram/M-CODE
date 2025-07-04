import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import MovieSection from './components/MovieSection';
import VideoModal from './components/VideoModal';
import MovieDetail from './pages/MovieDetail';
import MovieSearch from './components/MovieSearch';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');

  const handleVideoSelect = (videoId) => {
    setSelectedVideoId(videoId);
    setShowModal(true);
  };

  const movies = {
    'Movies which makes us to watch more than once': [
      { thumbnail: '/assets/spiderverse.jpg', videoId: 'edAu5_O4C54', title: 'Spider-Man: Into the Spider-Verse', description: 'A multiverse of Spider-heroes team up to save the world.', badge: 'NEW', moreInfo: 'Miles Morales becomes Spider-Man and meets others from the multiverse. Stunning animation and storytelling make it a must-watch.' },
      { thumbnail: '/assets/avengers.jpg', videoId: '8gcRTMr-rlg', title: 'Avengers: Endgame', description: 'The Avengers assemble for a final battle against Thanos.', badge: 'TOP', moreInfo: 'A cinematic conclusion to a decade of Marvel storytelling with emotional arcs and epic moments.' },
      { thumbnail: '/assets/interstellar.jpg', videoId: 'OA3Txp94pjs', title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space to ensure humanity\'s survival.', badge: 'CULT',moreInfo: "Starring: Leonardo DiCaprio, Joseph Gordon-Levitt. Genre: Sci-fi, Thriller." },
      { thumbnail: '/assets/inception.jpg', videoId: 'TAbbJT0ZXmk', title: 'Inception', description: 'A skilled thief is given a chance at redemption if he can successfully perform inception.', badge: 'CULT' },
      { thumbnail: '/assets/godfather.jpg', videoId: 'Rtbw8s1MJGo', title: 'The Godfather', description: 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.', badge: 'CULT' },
      { thumbnail: '/assets/batman.jpg', videoId: 'jane6C4rIwc', title: 'The Dark Knight', description: 'Batman faces off against the Joker in a battle for Gotham City\'s soul.', badge: 'NEW' },
      { thumbnail: '/assets/superman.jpg', videoId: '0ahPQ6M05HM', title: 'Superman', description: 'An alien with superhuman abilities protects Earth from various threats.', badge: 'NEW' },
      { thumbnail: '/assets/joker.jpg', videoId: 'JeyVU4nMWCg', title: 'Joker', description: 'A failed comedian turns to a life of crime and chaos in Gotham City.', badge: 'TOP' },
      { thumbnail: '/assets/captain.jpg', videoId: 'PS0S22DmKTw', title: 'Captain America: Brave New World', description: 'Captain America teams up with Black Widow to uncover a conspiracy within S.H.I.E.L.D.', badge: 'NEW' },
      { thumbnail: '/assets/spiderman.jpg', videoId: 'R5mB0suWT7o', title: 'Spider-Man: No Way Home', description: 'Peter Parker navigates his dual identity as a high school student and superhero.', badge: 'NEW' },
    ],
    'Movies to be watched at least once': [
      { thumbnail: '/assets/pursuit.jpg', videoId: 'UZb2NOHPA2A', title: 'The Pursuit of Happyness', description: 'A struggling salesman takes custody of his son as he\'s poised to begin a life-changing professional career.', badge: 'TOP' },
      { thumbnail: '/assets/sooraraipottru.jpg', videoId: 'gB6TuBCBrkE', title: 'Soorarai Pottru', description: 'An entrepreneur fights against all odds to make air travel accessible to the common man.', badge: 'TOP' },
      { thumbnail: '/assets/jersey.jpg', videoId: '0BVkI-RJm-8', title: 'Jersey', description: 'A failed cricketer decides to return to the sport in his 30s to fulfill his son\'s wish.', badge: 'CLASSIC' },
      { thumbnail: '/assets/history.jpg', videoId: 'CNvBuv_sLjo', title: 'History Of Violence', description: 'A mild-mannered family man is unmasked as a brutal killer.', badge: 'CULT' },
      { thumbnail: '/assets/johnwick.jpg', videoId: 'LCjNPzoUC5g', title: 'John Wick', description: 'An ex-hitman comes out of retirement to track down the gangsters that took everything from him.', badge: 'TOP' },
      { thumbnail: '/assets/leo.jpg', videoId: 'RBtZpw5ioaM', title: 'Leo', description: 'A story about a man who discovers his true identity and purpose.', badge: 'LCU' },
      { thumbnail: '/assets/kaithi.jpg', videoId: '_ZZFNTd36QY', title: 'Kaithi', description: 'A recently released prisoner must transport a wounded police officer to safety.', badge: 'LCU' },
      { thumbnail: '/assets/memento.jpg', videoId: '9q7N1xQMp3g', title: 'Memento', description: 'A man with short-term memory loss attempts to track down his wife\'s murderer.', badge: 'CULT' },
      { thumbnail: '/assets/vikram.jpg', videoId: 'aoi11BdfpoM', title: 'Vikram', description: 'An undercover cop takes on a dangerous mission to bring down a drug lord.', badge: 'LCU' },
      { thumbnail: '/assets/thalapathi.jpg', videoId: 'wA30CKor18A', title: 'Thalapathi', description: 'A story of friendship and loyalty set against the backdrop of the underworld.', badge: 'CULT' },
    ]
  };

  return (
    <>
      <Header movies={movies}/>
      <VideoModal
  show={showModal}
  handleClose={() => setShowModal(false)}
  videoId={selectedVideoId}
/>
      <Routes>
        <Route path="/" element={
          <div className="text-light min-vh-100" style={{ backgroundColor: '#000' }}>
            <HeroCarousel onSelect={handleVideoSelect} movies={movies} />
            {Object.entries(movies).map(([category, movieList]) => (
              <MovieSection
                key={category}
                title={category}
                movies={movieList}
                onSelect={handleVideoSelect}
              />
            ))}
          </div>
        } />


        <Route path="/movie/:id" element={
          <div>
            <MovieDetail movies={movies} onSelect={handleVideoSelect}/>
          </div>
        } />  
          
      </Routes>
    </>
  );
}

export default App;