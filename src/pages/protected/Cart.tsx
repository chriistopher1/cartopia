import React from 'react';
import { useGetUserCartList } from '../../lib/tanstack/queries';
import { useUserContext } from '../../context/AuthProvider';
import { IUser } from '../../types';

const Cart = () => {
  const { user } = useUserContext();
  const { data: userCartList, isPending } = useGetUserCartList(user?.accountId);

  if (!user || !user.accountId) return null; 

  if (isPending) return <div>Loading...</div>;

  console.log(userCartList);

  return (
    <div>
      {/* <div>{userCartList && userCartList.item[0]}</div> */}
      <div>Halo</div>
    </div>
  );
};

export default Cart;
