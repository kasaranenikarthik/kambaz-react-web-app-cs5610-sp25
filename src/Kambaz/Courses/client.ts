import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};
export const updateCourse = async (course: any) => {
  console.log(course);
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
}

export const createModuleForCourse = async (courseId: string, module: any) => {
  //console.log("createModuleForCourse", courseId, module);
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  //console.log("createModuleForCourse", response.data);
  return response.data; 
}

export const createCourse = async (course: any) => { 
  const { data } = await axiosWithCredentials.post(COURSES_API, course); 
  return data; 
 }; 

export const findUsersForCourse = async (courseId: string) => { 
  const response = await axios.get(`${COURSES_API}/${courseId}/users`); 
  return response.data; 
}; 