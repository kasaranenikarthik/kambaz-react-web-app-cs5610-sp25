import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <table id="wd-dashboard-published-table">
                    <tr>
                        <td>
                            <div className="wd-dashboard-course">
                                <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link" >
                                    <img src="/images/reactjs.jpg" width={200} />
                                    <div>
                                        <h5> CS1234 React JS </h5>
                                        <p className="wd-dashboard-course-title"> Full Stack software developer  </p>
                                        <button> Go </button>
                                    </div>
                                </Link>
                            </div>
                        </td>

                        <td>
                            <div className="wd-dashboard-course">
                                <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link" >
                                    <img src="/images/pdp.jpg" width={200} />
                                    <div>
                                        <h5> CS5100 Programming Design Paradigm </h5>
                                        <p className="wd-dashboard-course-title"> Software Solution Engineer </p>
                                        <button> Go </button>
                                    </div>
                                </Link>
                            </div>
                        </td>

                        <td>
                            <div className="wd-dashboard-course">
                                <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link" >
                                    <img src="/images/FAI.jpg" width={200} />
                                    <div>
                                        <h5> CS5010 Foundations of AI </h5>
                                        <p className="wd-dashboard-course-title"> AI model developer  </p>
                                        <button> Go </button>
                                    </div>
                                </Link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="wd-dashboard-course">
                                <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link" >
                                    <img src="/images/gameai.jpeg" width={200} />
                                    <div>
                                        <h5> CS 5150 Game Artificial Intelligence </h5>
                                        <p className="wd-dashboard-course-title"> Game AI developer  </p>
                                        <button> Go </button>
                                    </div>
                                </Link>
                            </div>
                        </td>
                        <td>
                            <div className="wd-dashboard-course">
                                <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link" >
                                    <img src="/images/Algo.png" width={200} />
                                    <div>
                                        <h5> CS 5800 Algorithms </h5>
                                        <p className="wd-dashboard-course-title"> Software developer  </p>
                                        <button> Go </button>
                                    </div>
                                </Link>
                            </div>
                        </td>
                        <td>
                            <div className="wd-dashboard-course">
                                <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link" >
                                    <img src="/images/reactjs.jpg" width={200} />
                                    <div>
                                        <h5> CS 5610 Web Development </h5>
                                        <p className="wd-dashboard-course-title"> Full Stack software developer  </p>
                                        <button> Go </button>
                                    </div>
                                </Link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="wd-dashboard-course">
                                <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link" >
                                    <img src="/images/dbms.png" width={200} />
                                    <div>
                                        <h5> CS 5200 Database Management Systems </h5>
                                        <p className="wd-dashboard-course-title"> Database Admin  </p>
                                        <button> Go </button>
                                    </div>
                                </Link>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
