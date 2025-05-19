import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentOp = () => {
  const { newsId } = useParams();
  const [refresh, setRefresh] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${import.meta.env.VITE_ADD_COMMENT}/${newsId}`,data,
         {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      if (response.status !== 200) {
        toast.error(response?.data?.msg || "Error adding comment");
        return;
      }

      toast.success("Comment added!");
      reset();
      setRefresh((r) => !r);
    } catch (error) {
      console.log("Error adding comment", error);
      toast.error("Failed to add comment.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 container">
      <NewsCard newsId={newsId} refresh={refresh} />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <label htmlFor="comment" className="block font-semibold mb-2">
          Add Comment:
        </label>
        <textarea
          id="comment"
          aria-invalid={errors.comment ? "true" : "false"}
          aria-describedby="comment-error"
          rows={6}
          className={`w-full p-2 border rounded resize-none ${
            errors.comment ? "border-red-500" : "border-gray-300"
          }`}
          {...register("comment", {
            required: "Comment cannot be empty",
            minLength: {
              value: 5,
              message: "Comment should be at least 5 characters",
            },
          })}
        />

        {errors.comment && (
          <p id="comment-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.comment.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-3 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding..." : "Add Comment"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CommentOp;
