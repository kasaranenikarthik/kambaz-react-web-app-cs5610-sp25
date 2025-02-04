import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                    className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                                <Card.Body>
                                <Card.Title className="wd-dashboard-course-title">CS1234 React JS</Card.Title>
                                <Card.Text  className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                                <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                    className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/pdp.jpg" width="100%" height={160}/>
                                <Card.Body>
                                <Card.Title className="wd-dashboard-course-title">CS5100 Programming Design Paradigm</Card.Title>
                                <Card.Text  className="wd-dashboard-course-description">Software Solution Engineer</Card.Text>
                                <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                    className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/FAI.jpg" width="100%" height={160}/>
                                <Card.Body>
                                <Card.Title className="wd-dashboard-course-title">CS5010 Foundations of AI</Card.Title>
                                <Card.Text  className="wd-dashboard-course-description">AI model developer</Card.Text>
                                <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                    className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/gameai.jpeg" width="100%" height={160}/>
                                <Card.Body>
                                <Card.Title className="wd-dashboard-course-title">CS5150 Game Artificial Intelligence</Card.Title>
                                <Card.Text  className="wd-dashboard-course-description">Game AI developer</Card.Text>
                                <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                    className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/Algo.png" width="100%" height={160}/>
                                <Card.Body>
                                <Card.Title className="wd-dashboard-course-title">CS5800 Algorithms</Card.Title>
                                <Card.Text  className="wd-dashboard-course-description">Software developer</Card.Text>
                                <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                    className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                                <Card.Body>
                                <Card.Title className="wd-dashboard-course-title">CS5610 Web Development</Card.Title>
                                <Card.Text  className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                                <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                    className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/dbms.png" width="100%" height={160}/>
                                <Card.Body>
                                <Card.Title className="wd-dashboard-course-title">CS5200 Database Management Systems</Card.Title>
                                <Card.Text  className="wd-dashboard-course-description">Database Admin</Card.Text>
                                <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
