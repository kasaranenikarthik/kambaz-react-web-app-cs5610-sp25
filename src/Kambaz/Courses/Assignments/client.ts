import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api`;

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

//read
export const getAssignmentsForCourse = async (courseId: any) => {
  const response = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/courses/${courseId}/assignments`);
  return response.data;
};

//create

export const createAssignment = async (courseId: any, assignment: any) => {
  const response = await axiosWithCredentials.post(`${ASSIGNMENTS_API}/courses/${courseId}/assignments`, assignment);
  return response.data;
};

//update
export const updateAssignment = async (courseId: any, assignmentId: any, assignment: any) => {
  const response = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/courses/${courseId}/assignments/${assignmentId}`, assignment);
  return response.data;
};

//delete
export const deleteAssignment = async (courseId: any, assignmentId: any) => {
  const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/courses/${courseId}/assignments/${assignmentId}`);
  return response.data;
};