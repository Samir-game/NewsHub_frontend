import { NavLink } from "react-router-dom";
import "./ArticleCard.css";

const ArticleCard = ({ article }) => {
  return (
    <NavLink to={`/news/${article._id}`} className="articlecard-link">
      <div className="articlecard-container">
        <h2 className="articlecard-title">{article.newsTitle}</h2>
        <p className="articlecard-source">{article.newsSource}</p>
        <p className="articlecard-date">
          {new Date(article.newsPublishedAt).toLocaleString()}
        </p>
      </div>
    </NavLink>
  );
};

export default ArticleCard;
