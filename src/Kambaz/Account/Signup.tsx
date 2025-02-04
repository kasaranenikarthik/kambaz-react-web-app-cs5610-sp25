import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Signup() {
    return (
        <div id="wd-signup-screen">
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Verify Password</Form.Label>
                <Form.Control type="password" placeholder="Verify Password" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Link  to="/Kambaz/Account/Profile" className="btn btn-primary w-100 mb-2" > Sign up </Link><br />
                <Link id="wd-signin-link" to="/Kambaz/Account/Signin" className="btn btn-primary w-100 mb-2">Sign in</Link>
            </Form.Group>
        </Form>

        </div>
    );
}
