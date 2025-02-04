import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";


export default function KambazNavigation() {
    return (
        <div id="wd-kambaz-navigation" style={{ width: 110 }}  className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
            <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank" className="list-group-item bg-black border-0 text-center">
                <img src="/images/NEU.png" width="75px" />
            </a><br/>
            <Link to="/Kambaz/Account" id="wd-account-link"  className="list-group-item text-center border-0 bg-black text-white">
                <FaRegCircleUser className="fs-1 text text-white"/> <br/> Account
            </Link><br/>
            <Link to="/Kambaz/Dashboard" id="wd-dashboard-link" className="list-group-item list-group-item-light text-center border-0 text-danger">
                <AiOutlineDashboard className="fs-1 text-danger" /><br />
                Dashboard
            </Link><br/>
            <Link to="/Kambaz/Courses" id="wd-course-link" className="list-group-item text-center border-0 bg-black text-danger">
                <LiaBookSolid className="fs-1 text-danger" /><br />
                Courses
            </Link><br/>
            <Link to="/Kambaz/Calendar" id="wd-calendar-link" className="list-group-item text-center border-0 bg-black text-danger">
                <IoCalendarOutline className="fs-1 text-danger" /><br />
                Calendar
            </Link><br/>
            <Link to="/Kambaz/Inbox" id="wd-inbox-link" className="list-group-item text-center border-0 bg-black text-danger">
                <FaInbox className="fs-1 text-danger" /><br />
                Inbox
            </Link><br/>
            <Link to="/Labs" id="wd-labs-link" className="list-group-item text-center border-0 bg-black text-danger">
                <LiaCogSolid className="fs-1 text-danger" /><br />
                Labs
            </Link><br/>
        </div>
    );
}
