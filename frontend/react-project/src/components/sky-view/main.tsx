import React from 'react';
import { useNavigate } from 'react-router-dom';

const MediaMain: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (title: string, category: string) => {
    navigate(`details/${encodeURIComponent(title)}`, {
      state: { category },
    });
  };

  return (
    <main className="main">
      <div className="hero">
        <h1>空撮動画・画像</h1>
      </div>
      <section className="features" id="features">
        <h2>季節・時間帯</h2>
        <div className="feature-cards">
          <div
            className="card"
            onClick={() =>
              handleCardClick('春', 'spring')
            }
          >
            <h3>春</h3>
            <p>Experience breathtaking visuals from the sky.</p>
          </div>
          <div
            className="card"
            onClick={() =>
              handleCardClick('夏', 'summer')
            }
          >
            <h3>夏</h3>
            <p>Get the rights you need for your projects easily.</p>
          </div>
          <div
            className="card"
            onClick={() =>
              handleCardClick('秋', 'fall')
            }
          >
            <h3>秋</h3>
            <p>Connect with talented creators worldwide.</p>
          </div>
          <div
            className="card"
            onClick={() =>
              handleCardClick('冬', 'winter')
            }
          >
            <h3>冬</h3>
            <p>Connect with talented creators worldwide.</p>
          </div>
        </div>
      </section>
      <section className="features" id="features">
        <h2>季節・時間帯</h2>
        <div className="feature-cards">
          <div
            className="card"
            onClick={() => handleCardClick('朝日', 'sunrise')}
          >
            <h3>朝日</h3>
            <p>Get the rights you need for your projects easily.</p>
          </div>
          <div
            className="card"
            onClick={() => handleCardClick('夕陽', 'sunset')}
          >
            <h3>夕陽</h3>
            <p>Get the rights you need for your projects easily.</p>
          </div>
          <div
            className="card"
            onClick={() => handleCardClick('夜景', 'nightview')}
          >
            <h3>夜景</h3>
            <p>Get the rights you need for your projects easily.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MediaMain;