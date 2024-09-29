import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Schedule from './pages/schedule';
import About from './pages/about';
import Blog from './pages/blog';
import Media from './pages/media';
import Contact from './pages/contact';
import Access from './pages/access';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className='header-content'>
            <div className="title">
            <Link to="/">Drone Club</Link>
            </div>
            <nav>
              <ul className='nav-list'>
                <li><Link to="/schedule"><button>活動スケジュール</button></Link></li>
                <li><Link to="/about"><button>クラブ紹介</button></Link></li>
                <li><Link to="/blog"><button>ブログ</button></Link></li>
                <li><Link to="/media"><button>空撮動画・画像</button></Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog/*" element={<Blog />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/access" element={<Access />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <ul>
            <li><Link to="/contact"><button>お問い合わせ</button></Link></li>
            <li><Link to="/access"><button>交通・アクセス</button></Link></li>
          </ul>
        </footer>
      </div>
    </Router>
  );
}

export default App;