import { FaStar } from "react-icons/fa";
import { IReviewItem } from "../../../types";

interface LeftSideReviewProps {
  reviewArray: IReviewItem[] | undefined;
}

const calculateAverage = (inputArray: IReviewItem[] | undefined): number => {
  if (inputArray == undefined || inputArray.length === 0) return 0;

  let sum = 0;
  let count = 0;

  for (let index = 0; index < inputArray.length; index++) {
    const rating = inputArray[index].rating;
    if (rating !== undefined) {
      sum += rating;
      count++;
    }
  }

  if (count === 0) return 0;

  return sum / count;
};

const calculateBarWidth = (total: number, arrayLength: number): string => {
  if (total === 0) return "0%";

  const percentage = (total / arrayLength) * 100;


  console.log(total,  `${percentage}%`)
  return `${percentage}%`;
};

const LeftSideReview = ({ reviewArray }: LeftSideReviewProps) => {
  const calculateEachTotalRating: number[] = new Array(5).fill(0);

  const arrayLength: number = reviewArray?.length ?? 0;

  for (let index = 0; index < arrayLength; index++) {
    const element = reviewArray?.[index];

    if (element && element.rating !== undefined) {
      calculateEachTotalRating[element.rating - 1] += 1;
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full md:w-[25%]">
      <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">Review</h2>
      <div className="flex items-center">
        <FaStar className="text-2xl text-yellow-400" />
        <h3 className="font-bold text-3xl md:text-4xl">
          {calculateAverage(reviewArray)}
          <span className="ml-2 font-normal text-lg md:text-xl">
            /{arrayLength}
          </span>
        </h3>
      </div>
      <div className="flex flex-col">
        {calculateEachTotalRating.map((count, index) => (
          <div key={index} className="flex items-center">
            <FaStar className="text-yellow-400 mr-1 text-2xl" />
            <h4 className="text-lg md:text-xl lg:text-lg">{index + 1}</h4>
            <div className="w-full h-3 bg-[#e6ebf4] mx-3 rounded-lg relative">
              <div
                className={`absolute top-0 left-0 h-full bg-green-500 rounded-lg w-[${calculateBarWidth(
                  count,
                  arrayLength
                )}]`}
              ></div>
            </div>
            <h4 className="text-xs md:text-md lg:text-lg">{count}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};


export default LeftSideReview;
