import { Navigate, Route, Routes } from "react-router";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";

export default function Account() {
    return (
        <div id="wd-account-screen" className="wd d-flex">
          <AccountNavigation />
          <div className="ms-3 w-25">
            <Routes>
              <Route path="/"        element={<Navigate to="/Kambaz/Account/Signin" />} />
              <Route path="/Signin"  element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup"  element={<Signup />} />
            </Routes> 
          </div>
      </div>
  );
}