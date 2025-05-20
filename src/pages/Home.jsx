import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArticleCard from "../components/ArticleCard";
import "./Home.css";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [news, setNews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNews = async (page) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_FETCH_NEWS_DB}?page=${page}&limit=10`
      );

      if (response.status !== 200) {
        toast.error("Error getting news headlines");
        return;
      }

      setTotalPages(response?.data?.totalPages);
      setNews(response?.data?.news);
    } catch (error) {
      console.log("Error getting news from backend/database", error);
      toast.error("Failed to fetch news. Try again later.");
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1){
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages){ 
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="home-container">
      <ToastContainer />
      <h1 className="home-title">Latest Headlines</h1>

      <div className="articles-grid">
        {news.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page-indicator">Page {currentPage} of {totalPages}</span>
        <button
          className="pagination-button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
