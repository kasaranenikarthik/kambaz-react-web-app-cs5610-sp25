import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: { moduleId: string; deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void; }) {
    //console.log("ModuleControlButtons", moduleId);
    return (
        <div className="float-end">
            <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3 mb-1" />
            <FaTrash className="text-danger me-3 mb-1" onClick={() => deleteModule(moduleId)}/>
            <GreenCheckmark/>
            <BsPlus className="fs-3 ms-2" />
            <IoEllipsisVertical className="fs-3" />
        </div>
    );
}