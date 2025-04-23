import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
export default function Signup() {
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signup = async () => {
        const currentUser = await client.signup(user);
        dispatch(setCurrentUser(currentUser));
        navigate("/Kambaz/Account/Profile");
    }

    const signin = async () => {
        navigate("/Kambaz/Account/Signin");
    }
    return (
        <div className="wd-signup-screen">
        <h1>Sign up</h1>
        <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
               className="wd-username b-2" placeholder="username" />
        <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
               className="wd-password mb-2" placeholder="password" type="password"/>
        <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />
        <button onClick={signin} className="wd-signup-btn btn btn-primary mt-2 w-100"> Sign in </button><br />
      </div>
    );
}
