import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Signin() {
  return (
        <div id="wd-signin-screen">
                <Form>
                        <Form.Group className="mb-3">
                                <Form.Label className="fs-3">Sign in</Form.Label><br />
                                <Form.Control id="wd-username"
                                        placeholder="username"
                                        className="mb-2"/><br />
                                <Form.Control id="wd-password"
                                        placeholder="password" type="password"
                                        className="mb-2"/><br />
                                <Link id="wd-signin-btn"
                                        to="/Kambaz/Account/Profile"
                                        className="btn btn-primary w-100 mb-2">
                                        Sign in </Link><br />
                                <Link id="wd-signup-link" to="/Kambaz/Account/Signup" className="btn btn-primary w-100 mb-2">Sign up</Link>
                        </Form.Group>
                </Form>
        </div> 
    );
}