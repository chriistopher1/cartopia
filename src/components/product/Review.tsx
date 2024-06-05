import { useGetProductReview } from "../../lib/tanstack/queries";
import { IReviewItem } from "../../types";
import { FaStar } from "react-icons/fa";
import LeftSideReview from "./review/LeftSideReview";
import ReviewCard from "../card/ReviewCard";

interface ReviewProps {
  productId: string | undefined;
}

const Review = (currentProduct: ReviewProps) => {
  const { data: productReview, isPending: isGettingProductReview } =
    useGetProductReview(currentProduct.productId);

  if (isGettingProductReview) return <div>Loading..</div>;

  // console.log(productReview)

  return (
    <div className="flex flex-col md:flex-row gap-5 mx-5 md:mx-10 mb-10 ">
      <LeftSideReview reviewArray={productReview?.item} />
      <div className="flex flex-col gap-2 grow h-max">
        <div className="mb-2">
          {" "}
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl mb-1">
            Customer's Photo & Videos
          </h3>
          <div className="flex gap-2">
            {productReview?.item &&
              productReview.item.map((review, index) =>
                review.imageUrl ? (
                  <img
                    key={index}
                    src={review.imageUrl}
                    className="w-20 h-auto rounded-lg cursor-pointer"
                  />
                ) : null 
              )}
          </div>
        </div>
        {productReview?.item &&
          productReview.item.map((review, index) => (
            <ReviewCard
              key={index}
              createdAt={review.createdAt}
              description={review.description}
              imageUrl={review.imageUrl}
              rating={review.rating}
              user={review.user}
            />
          ))}
      </div>
    </div>
  );
};

export default Review;
