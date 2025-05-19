import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsCard = ({ newsId, refresh }) => {

  const [news, setNews] = useState({});

  const getDetailedNewsAndComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_FETCH_NEWS_DB}/${newsId}`
      );

      if(response.status!==200){
        toast.error("Error getting details of this news")
        return;
      }

      setNews(response?.data?.news);

    } catch (error) {
      console.log("error getting details of this news",error);
      toast.error("error getting news.")
    }
  };

  const deleteComment = async (commentId) => {
    
    const token=localStorage.getItem("token")

    try {

      const response = await axios.delete(
        `${import.meta.env.VITE_DELETE_COMMENT}/${commentId}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      if(response.status!==200){
        toast.error(response?.data?.msg || "error deleting comment")
        return
      }

      getDetailedNewsAndComments();

    } catch (error) {
      console.log("error deleting comment", error);
      toast.error("error deleting the comment")
    }
  };

  useEffect(() => {
    getDetailedNewsAndComments();
  }, [newsId, refresh]);

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-2">{news.newsTitle}</h2>

        <p className="text-sm text-gray-500 mb-6">
          Published on: {new Date(news.newsPublishedAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Source:</strong> {news.newsSource}
        </p>
        {news.newsImage && (
          <img
            src={news.newsImage}
            alt="News"
            className="w-full mb-4 rounded"
          />
        )}
        <p className="text-lg mb-4">{news.newsDescription}</p>
        <p className="text-gray-700 mb-4">{news.newsContent}</p>

        {news.newsUrl && (
          <div className="mt-6">
            <a
              href={news.newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Read more
            </a>
          </div>
        )}
      </div>
      {/* comments */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {news.newsComments && news.newsComments.length > 0 ? (
          <ul className="space-y-2">
            {news.newsComments.map((comment) => (
              <li
                key={comment._id}
                className="border p-3 rounded bg-gray-100 text-sm text-gray-800"
              >
                <p>{comment.user.userName}</p>
                <p>{comment.comment}</p>
                <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                
                {comment.user._id === localStorage.getItem("userId") && (
                  <button
                    onClick={()=>deleteComment(comment._id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000}/>
      
    </div>
  );
};

export default NewsCard;
