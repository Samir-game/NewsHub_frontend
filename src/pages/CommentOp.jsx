import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CommentOp.css";

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

      const response = await axios.post(
        `${import.meta.env.VITE_ADD_COMMENT}/${newsId}`,
        data,
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
      reset();
      setRefresh((r) => !r);
    } catch (error) {
      console.log("Error adding comment", error);
      toast.error("Failed to add comment.");
    }
  };

  return (
    <div className="commentop-container">
      <NewsCard newsId={newsId} refresh={refresh} />

      <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="comment" className="comment-label">
          Add Comment:
        </label>
        <textarea
          id="comment"
          className={`comment-textarea ${errors.comment ? "error" : ""}`}
          aria-invalid={errors.comment ? "true" : "false"}
          aria-describedby="comment-error"
          rows={6}
          {...register("comment", {
            required: "Comment cannot be empty",
            minLength: {
              value: 5,
              message: "Comment should be at least 5 characters",
            },
          })}
        />

        {errors.comment && (
          <p id="comment-error" role="alert" className="error-message">
            {errors.comment.message}
          </p>
        )}

        <button
          className="comment-submit-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Comment"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CommentOp;
