import { Link } from 'react-router-dom';
import './FirstPage.css';

const FirstPage = () => {
  return (
    <div className="firstpage-container">
      <h1 className="firstpage-header">Welcome to NewsHub</h1>
      <p className="firstpage-subtext">Your reliable source for real-time, relevant, and trusted news.</p>

      <div className="qa-cards">
        <div className="qa-card">
          <h2 className="qa-question">📰 What is NewsHub?</h2>
          <p className="qa-answer">
            NewsHub is a modern news aggregation platform that brings you curated, up-to-date news from reliable sources across the globe—all in one place.
          </p>
        </div>

        <div className="qa-card">
          <h2 className="qa-question">🌍 Why should I use NewsHub?</h2>
          <p className="qa-answer">
            We filter out noise and bring you the most important stories from politics, sports, entertainment, technology, and more, so you never miss what's truly important.
          </p>
        </div>

        <div className="qa-card">
          <h2 className="qa-question">🔔 What features does NewsHub offer?</h2>
          <p className="qa-answer">
            Personalized news feed, trending topics, article bookmarks, and real-time updates make NewsHub your go-to portal for all things news.
          </p>
        </div>
      </div>

      <div className="auth-buttons">
        <Link to="/signup" className="auth-button">Sign Up</Link>
        <Link to="/login" className="auth-button">Login</Link>
      </div>

    </div>
  );
};

export default FirstPage;
