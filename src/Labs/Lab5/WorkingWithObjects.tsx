import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
      });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;
    const [module, setModule] = useState({id: 1, name: "NodeJS", description: "NodeJS Module", 
        course: "Web Development",});

    const [isChecked, setIsChecked] = useState(assignment.completed);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setIsChecked(event.target.checked);
    }

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />
        <a id="wd-update-assignment-completed"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
                onClick={() => setAssignment({ ...assignment, completed: isChecked })}>
            Update Completed
        </a>
        <label htmlFor="wd-assignment-completed">Completed</label> 
        <input className="ms-2" type="checkbox" checked={isChecked} onChange={handleChange} title="Completed"/>
        <hr />
        <p>{isChecked ? "True":"False"}</p>

        <a id="wd-update-assignment-score"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
        </a>
        <FormControl className="w-75" id="wd-assignment-score"
            defaultValue={assignment.score} onChange={(e) =>
                setAssignment({ ...assignment, score: Number(e.target.value) })}/>
        <hr />
      
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Assignment Title
      </a><hr/>
      <a id="wd-retrieve-assignment-completed" 
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment/completed`}>
        Get Assignment Completed
        </a><hr/>
        <a id="wd-retrieve-assignment-score" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment/score`}>
        Get Assignment Score
        </a><hr/>
      
      <a id="wd-retrieve-module" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module`}>
        Get Module
      </a><hr/>
      <a id="wd-update-module-name"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Name
      </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={module.name} onChange={(e) =>
          setModule({ ...module, name: e.target.value })}/>
      <hr />

    </div>
);}
