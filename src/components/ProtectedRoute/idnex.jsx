import { useSelector } from "react-redux";
import NotFound from "../../pages/404NF";
const RoleBaseRole = (props) => {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const user = useSelector(state => state.account.user);
  if (isAdminRoute && user.role === "ADMIN") {
    return (<>{props.children}</>)
  }
  else {
    return <NotFound />
  }
}


const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

  return (
    <>
      <RoleBaseRole>
        {props.children}
      </RoleBaseRole>
    </>
  )
}

export default ProtectedRoute;