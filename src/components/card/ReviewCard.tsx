import { FaStar } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { IReviewItem } from "../../types";
import { Timestamp } from "firebase/firestore";

const formatTimeStampToReadable = (time: Timestamp | undefined): string => {
  if (time == undefined) return "";

  const date = time.toDate();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const ReviewCard = (review: IReviewItem) => {
    const rating = review.rating ?? 0;
  return (
    <div className="grow flex flex-col gap-2 shadow-md  p-4 h-fit">
      <div className="flex justify-between">
      <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, index) => (
            <FaStar key={index} className="text-xl text-yellow-400" />
          ))}
          {Array.from({ length: 5 - rating }).map((_, index) => (
            <FaStar key={index} className="text-xl text-[#e6ebf4]" />
          ))}
        </div>
        <h4 className="font-semibold">
          {formatTimeStampToReadable(review.createdAt)}
        </h4>
        <CiMenuKebab className="text-xl cursor-pointer font-bold" />
      </div>
      <div className="flex gap-2 items-center">
        <img src={review.user?.imageUrl} className="w-8 h-8 rounded-lg" />
        <h3 className="font-semibold">{review.user?.name}</h3>
      </div>
      <div>{review.description}</div>
      <img src={review.imageUrl} className="w-16 h-auto rounded-lg cursor-pointer"/>
    </div>
  );
};

export default ReviewCard;
