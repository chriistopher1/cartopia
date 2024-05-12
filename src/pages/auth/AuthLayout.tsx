import { Outlet } from "react-router-dom"
import { useUserContext } from "../../context/AuthProvider"
import { useEffect } from "react"

const AuthLayout = () => {

    return (
    <>
        <Outlet />
    </>
  )
}

export default AuthLayout