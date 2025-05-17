import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentOp = () => {
    const { newsId } = useParams();
    const [refresh,setRefresh]=useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const addComment = async (data) => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_ADD_COMMENT}/${newsId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if(response.status!==201){
          toast.error(response?.data?.msg || "Error adding comment to the news.")
          return;
        }
        
        setRefresh((prev)=>!prev)
        reset(); 

      } catch (error) {
        console.error("Error adding comment", error);
        toast.error("error adding comment");
      }
    };

    return (
        <div className="p-4">
            <div className="mb-6">
              <NewsCard newsId={newsId} refresh={refresh}/>
            </div>

            <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
                <form onSubmit={handleSubmit(addComment)} className="space-y-4">
                    <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Write your comment..."
                    {...register("comment", { required: "Comment is required" })}
                    />
                    {errors.comment && (
                    <p className="text-red-500">{errors.comment.message}</p>
                    )}

                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    {isSubmitting ? "Submitting..." : "Post Comment"}
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={3000}/>
      </div>
    );
};  

export default CommentOp;
