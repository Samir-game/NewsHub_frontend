import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArticleCard from "../components/ArticleCard";

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

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 container">
      <h1 className="text-blue-500 text-3xl font-bold mb-6 text-center">
        Latest News
      </h1>

      {news.length === 0 ? (
        <p className="text-center text-gray-500">No news available.</p>
      ) : (
        <ul className="space-y-4">
          {news.map((nz) => (
            <li key={nz._id}>
              <ArticleCard article={nz} />
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Home;
