import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = useLocation().pathname;
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
        {!currentUser && <>
          <Link to={`/Kambaz/Account/Signin`} className={`list-group-item list-group-item-action border border-0 ${pathname.includes("Signin") ? "active" : "text-danger"}`}>
            Signin
          </Link><br /><Link to={`/Kambaz/Account/Signup`} className={`list-group-item list-group-item-action border border-0 ${pathname.includes("Signup") ? "active" : "text-danger"}`}>
              Signup
          </Link><br />
        </>}
        {currentUser && <>
          <Link to={`/Kambaz/Account/Profile`} className={`list-group-item list-group-item-action border border-0 ${pathname.includes("Profile") ? "active" : "text-danger"}`}>
            Profile
          </Link><br />
        </>}<br />
        {currentUser && currentUser.role === "ADMIN" && ( 
          <Link to={`/Kambaz/Account/Users`} className={`list-group-item list-group-item-action border border-0 ${pathname.includes("Users") ? "active" : "text-danger"}`}> 
            Users 
          </Link> )} 
    </div>
);}
