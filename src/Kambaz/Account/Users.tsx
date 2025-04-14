import { useState, useEffect } from "react"; 
import { useParams } from "react-router"; 
import PeopleTable from "../Courses/People/Table"; 
import * as client from "./client"; 
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function Users() { 
 const [users, setUsers] = useState<any[]>([]); 
 const [role, setRole] = useState("");
 const { uid } = useParams();

 const [name, setName] = useState(""); 

  const filterUsersByName = async (name: string) => { 
    setName(name); 
    if (name) { 
      const users = await client.findUsersByPartialName(name); 
      setUsers(users); 
    } else { 
      fetchUsers(); 
    } 
  }; 

 const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
        const users = await client.findUsersByRole(role);
        setUsers(users);
    } else {
        fetchUsers();
    }
};


 const fetchUsers = async () => { 
   const usrs = await client.findAllUsers(); 
   setUsers(usrs); 
 }; 

 const createUser = async () => { 
    const user = await client.createUser({ 
      firstName: "New", 
      lastName: `User${users.length + 1}`, 
      username: `newuser${Date.now()}`, 
      password: "password123", 
      email: `email${users.length + 1}@neu.edu`, 
      section: "S101", 
      role: "STUDENT", 
    }); 
    setUsers([...users, user]); 
  }; 

 useEffect(() => { 
   fetchUsers(); 
 }, [uid]); 


 return ( 
   <div> 
     <h3>Users</h3> 
     <Button onClick={createUser} className="float-end me-2 btn btn-danger wd-add-people"> 
        <FaPlus className="me-2" /> 
        Users 
      </Button>
     <FormControl onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people" 
             className="float-start w-45 mt-2 wd-filter-by-name" /> 
     <FormSelect value={role} onChange={(e) =>filterUsersByRole(e.target.value)} className="form-select mt-2 mb-2 float-start w-45 me-2 wd-select-role" > 
        <option value="">All Roles</option>    
        <option value="STUDENT">Students</option> 
        <option value="TA">Assistants</option> 
        <option value="FACULTY">Faculty</option> 
        <option value="ADMIN">Administrators</option> 
      </FormSelect>
     <PeopleTable users={users} /> 
   </div> 
);} 