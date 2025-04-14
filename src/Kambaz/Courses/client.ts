import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const axiosWithCredentials = axios.create({
  withCredentials: true,   // This will include cookies in requests
});

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};
export const updateCourse = async (course: any) => {
  console.log(course);
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
}

export const createModuleForCourse = async (courseId: string, module: any) => {
  //console.log("createModuleForCourse", courseId, module);
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  //console.log("createModuleForCourse", response.data);
  return response.data;
  
};