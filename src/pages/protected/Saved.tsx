import { useGetUserSavedList } from "../../lib/tanstack/queries";
import { useUserContext } from "../../context/AuthProvider";
import SavedCard from "../../components/card/SavedCard";

const Saved = () => {
  const { user } = useUserContext();
  const { data: userSavedList, isPending } = useGetUserSavedList(
    user?.accountId
  );

  if (!user || !user.accountId) return null;

  if (isPending) return <div>Loading...</div>;

  // console.log(userCartList);

  return (
    <div>
      <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mx-4 md:mx-12 mb-4 border-b-2 border-[#63a5ea] pb-2 w-fit ">
        My Saved
      </h2>
      <div className="flex flex-col gap-4 mb-8 mx-4 md:mx-12">
        {userSavedList &&
          userSavedList?.item?.map((savedProduct) => (
            <SavedCard
              key={savedProduct.product?.id}
              product={savedProduct.product}
              quantity={savedProduct.quantity}
            />
          ))}
      </div>
    </div>
  );
};

export default Saved;
