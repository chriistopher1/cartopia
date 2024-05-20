import { useUserContext } from "../../context/AuthProvider"
import {  useGetUserOrderList } from "../../lib/tanstack/queries"

const Profile = () => {

  const {user} = useUserContext()

  const {data} = useGetUserOrderList(user.accountId)

  console.log(data);

  return (
    <div className=""></div>
  )
}

export default Profile