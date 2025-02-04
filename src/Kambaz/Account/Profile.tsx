import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <Form>
                <Form.Group controlId="wd-username">
                    <Form.Label className="fs-3">Profile</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Control defaultValue="alice" type="text" placeholder="username" className="mb-2 wd-username"/>
                    <Form.Control defaultValue="123" type="password" placeholder="password" className="mb-2 wd-password"/>
                    <Form.Control defaultValue="Alice" type="text" placeholder="First Name" id="wd-firstname" className="mb-2"/>
                    <Form.Control defaultValue="Wonderland" type="text" placeholder="Last Name" id="wd-lastname" className="mb-2"/>
                    <Form.Control defaultValue="2000-01-01" type="date" id="wd-dob" className="mb-2"/>
                    <Form.Control defaultValue="alice@wonderland" type="email" id="wd-email" className="mb-2"/>
                    <Form.Control defaultValue="FACULTY" as="select" id="wd-role" className="mb-2">
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option> 
                        <option value="STUDENT">Student</option>
                    </Form.Control>
                    <Link to="/Kambaz/Account/Signin" className="btn btn-primary w-100 mb-2" >Sign out</Link>
                </Form.Group>
            </Form>
        </div>
    );
}
