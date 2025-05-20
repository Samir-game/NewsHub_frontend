import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NewsCard.css";

const NewsCard = ({ newsId, refresh }) => {
  const [news, setNews] = useState({});

  const getDetailedNewsAndComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_FETCH_NEWS_DB}/${newsId}`
      );

      if (response.status !== 200) {
        toast.error("Error getting details of this news");
        return;
      }

      setNews(response?.data?.news);
    } catch (error) {
      console.log("error getting details of this news", error);
      toast.error("error getting news.");
    }
  };

  const deleteComment = async (commentId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_DELETE_COMMENT}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        toast.error(response?.data?.msg || "error deleting comment");
        return;
      }

      getDetailedNewsAndComments();
    } catch (error) {
      console.log("error deleting comment", error);
      toast.error("error deleting the comment");
    }
  };

  useEffect(() => {
    getDetailedNewsAndComments();
  }, [newsId, refresh]);

  return (
    <div className="newscard-container">
      <div className="newscard-content">
        <h2 className="newscard-title">{news.newsTitle}</h2>
        <p className="newscard-published">
          Published on: {new Date(news.newsPublishedAt).toLocaleDateString()}
        </p>
        <p className="newscard-source">
          <strong>Source:</strong> {news.newsSource}
        </p>
        {news.newsImage && (
          <img className="newscard-image" src={news.newsImage} alt="News" />
        )}
        <p className="newscard-description">{news.newsDescription}</p>
        <p className="newscard-content-text">{news.newsContent}</p>

        {news.newsUrl && (
          <div className="newscard-readmore">
            <a href={news.newsUrl} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        )}
      </div>

      {/* Comments section */}
      <div className="newscard-comments">
        <h2 className="comments-title">Comments</h2>
        {news.newsComments && news.newsComments.length > 0 ? (
          <ul className="comments-list">
            {news.newsComments.map((comment) => (
              <li key={comment._id} className="comment-item">
                <p className="comment-username">{comment.user.userName}</p>
                <p className="comment-text">{comment.comment}</p>
                <p className="comment-date">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>

                {comment.user._id === localStorage.getItem("userId") && (
                  <button
                    className="comment-delete-btn"
                    onClick={() => deleteComment(comment._id)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-comments-msg">No comments yet.</p>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default NewsCard;
