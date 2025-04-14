import { Navigate, Route, Routes } from "react-router";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";
import Users from "./Users";
import ProtectedRoute from "./ProtectedRoute";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div id="wd-account-screen" className="wd d-flex">
          <AccountNavigation />
          <div className="ms-3 w-25">
            <Routes>
              <Route path="/"        element={<Navigate to={currentUser? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin"} /> } />
              <Route path="/Signin"  element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup"  element={<Signup />} />
              <Route path="/Users" element={<ProtectedRoute> <Users/> </ProtectedRoute>} />
              <Route path="/Users/:uid" element={<ProtectedRoute> <Users/> </ProtectedRoute>} />
            </Routes> 
          </div>
      </div>
  );
}