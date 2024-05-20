import { useUserContext } from "../../../context/AuthProvider";
import { useGetUserOrderList } from "../../../lib/tanstack/queries";
import OrderCard from "../../../components/card/OrderCard";
import { Link } from "react-router-dom";

const OrderShipping = () => {
  const { user } = useUserContext();
  const { data: userOrderList, isLoading: isGettingUserOrderList } =
    useGetUserOrderList(user.accountId);

  if (isGettingUserOrderList) {
    return <div>Loading...</div>;
  }

  //   console.log(userOrderList);

  return (
    <div className="mx-10 md:mx-16">
      <h1 className="font-bold text-2xl md:text-3xl border-b-2 pb-4 border-black w-fit mb-4">
        Shipping Orders
      </h1>
      <div className="flex gap-2 mb-2 flex-wrap">
        <Link
          className="border-2 px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-700 border-black"
          to="/user/order"
        >
          All Order
        </Link>
        <Link
          className="border-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700 border-black"
          to="/user/order/pending"
        >
          Pending
        </Link>
        <Link
          className="border-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 border-black"
          to="/user/order/shipping"
        >
          Shipping
        </Link>
        <Link
          className="border-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700 border-black"
          to="/user/order/complete"
        >
          Complete
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {userOrderList?.item
          ?.filter((order) => order.status === "shipping")
          ?.map((order) => (
            <OrderCard key={order.id} order={order} orderListId={user.order} />
          ))}
      </div>
    </div>
  );
};

export default OrderShipping;
