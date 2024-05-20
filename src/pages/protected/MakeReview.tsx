import { useLocation, useNavigate } from "react-router-dom";
import ImageUploader from "../../components/seller/ImageUploader";
import { useUserContext } from "../../context/AuthProvider";
import { IReviewItem } from "../../types";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useMakeReview } from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

const MakeReview = () => {
  const { user, isLoading } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const reviewData = location.state;

  if (!reviewData) {
    navigate(-1);
    return null;
  }

  const [rating, setRating] = useState<number>(reviewData.rating || 0);
  const [description, setDescription] = useState<string>(
    reviewData.description || ""
  );
  const [imageUrl, setImageUrl] = useState<string>(
    reviewData.imageUrl ?? ""
  );

  const { mutateAsync: makeReview, isPending: isMakingReview } =
    useMakeReview();

  // Handle image upload
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newReview: IReviewItem = {
      createdAt: Timestamp.now(),
      rating,
      user: user,
      imageUrl,
      description,
    };
    console.log(newReview);

    const isCompletedReview = await makeReview({
      newReview: newReview,
      orderId: reviewData.orderId,
      orderListId: reviewData.orderListId,
      productReviewId: reviewData.productReviewId,
    });

    if (isCompletedReview) {
      toast.success("Make review completed");
      navigate("/user/order")
    } else {
      toast.error("Make review error");
    }
  };

  console.log(reviewData)

  if (isLoading) return <div>Loading..</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">
        Review On {reviewData.productName}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            min="1"
            max="5"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>
        <div className="mb-4">
          <ImageUploader onImageUpload={handleImageUpload} />
         
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 ${
            isMakingReview ? "opacity-50 cursor-not-allowed" : ""
          }}`}
        >
          <AiOutlineLoading3Quarters
            className={`${
              isMakingReview ? "inline animate-spin" : "hidden"
            } mr-2`}
          />
          <span>Submit Review</span>
        </button>
      </form>
    </div>
  );
};

export default MakeReview;
