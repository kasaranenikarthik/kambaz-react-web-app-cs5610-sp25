import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithArrays() {
  const API = `${REMOTE_SERVER}/lab5/todos`;
    const [todo, setTodo] = useState({
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
      });
    
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos </a>
        <hr/>
        <h4>Retrieving an Item from an Array by ID</h4>
      <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <FormControl id="wd-todo-id" defaultValue={todo.id} className="w-50"
        onChange={(e) => setTodo({ ...todo, id: Number(e.target.value) })} />
      <hr />
      <h3>Filtering Array Items</h3>
        <a id="wd-retrieve-completed-todos" className="btn btn-primary"
            href={`${API}?completed=true`}>
            Get Completed Todos
        </a><hr/>
        <h3>Creating new Items in an Array</h3>
        <a id="wd-retrieve-completed-todos" className="btn btn-primary"
            href={`${API}/create`}>
            Create Todo
        </a><hr/>
        <h3>Deleting from an Array</h3>
        <a id="wd-retrieve-completed-todos" className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id} </a>
        <FormControl defaultValue={todo.id} className="w-50" onChange={(e) => setTodo({ ...todo, id: e.target.value })}/><hr/>

        <h3>Updating an Item in an Array</h3>
      <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary float-end">
        Update Todo</a>
      <FormControl defaultValue={todo.id} className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}/>
      <FormControl defaultValue={todo.title} className="w-50 float-start"
             onChange={(e) => setTodo({ ...todo, title: e.target.value }) }/>
      <br /><br /><hr />

      #Using the exercises so far as examples, implement routes and corresponding UI that allows editing a completed and description properties of todo items identified by their ID. Create the routes below in Lab5/index.js in the Node.js HTTP server project. In WorkingWithArrays component, add a text input field to edit the description and a checkbox input field to edit the completed property. Create a link that updates the description of the todo item whose id is encoded in the URL and another link that updates the completed property of the todo item whose id is encoded in the URL.
        <h3>Editing a Todo Item</h3>
        <a href={`${API}/${todo.id}/description/${todo.description}`} className="btn btn-primary float-end">
        Update Todo Description</a>
        <FormControl defaultValue={todo.id} className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}/>
        <FormControl defaultValue={todo.description} className="w-50 float-start"
            onChange={(e) => setTodo({ ...todo, description: e.target.value }) }/>
        <br /><br />
        <a href={`${API}/${todo.id}/completed/${todo.completed}`} className="btn btn-primary float-end">
        Update Todo Completed</a>
        <FormControl defaultValue={todo.id} className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}/>
        <FormControl defaultValue={String(todo.completed)} className="w-50 float-start"
            onChange={(e) => setTodo({ ...todo, completed: Boolean(e.target.value) }) }/>
        <br /><br />

            
    </div>
);}
