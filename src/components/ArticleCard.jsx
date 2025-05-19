import { NavLink } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <NavLink
      to={`/news/${article._id}`}
      className="block p-6 border rounded shadow hover:shadow-lg transition-shadow duration-300"
    >
      <h2 className="text-xl font-semibold">{article.newsTitle}</h2>
      <p className="text-gray-600">{article.newsSource}</p>
      <p className="text-sm text-gray-400 mt-2">
        {new Date(article.newsPublishedAt).toLocaleString()}
      </p>
    </NavLink>
  );
};

export default ArticleCard;
