import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { Button } from "react-bootstrap";

interface LessonControlButtonsProps {
    onAttachYouTube?: () => void;
    isFaculty?: boolean;
  }
  
  export default function LessonControlButtons({ onAttachYouTube, isFaculty }: LessonControlButtonsProps) {
    return (
      <div className="float-end ms-auto d-flex align-items-center gap-2">
        {isFaculty && onAttachYouTube && (
          <Button
            className="btn btn-outline-dark btn-sm"
            onClick={onAttachYouTube}
          >
            + YouTube
          </Button>
        )}
        <GreenCheckmark />
        <IoEllipsisVertical className="fs-4" />
      </div>
    );
  }