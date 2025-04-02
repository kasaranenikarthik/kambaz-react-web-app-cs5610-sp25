import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,   // This will include cookies in requests
});

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const ENROLL_API = `${REMOTE_SERVER}/api/enrollments`;

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post( `${USERS_API}/signin`, credentials );
  return response.data;
};

export const signup = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
  };

export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
  };

  export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/course`, course);
    return data;
  };
  
  export const deleteEnrollment = async (userId:any, courseId:any) => {
    const { data } = await axiosWithCredentials.delete(`${ENROLL_API}/${userId}/${courseId}`);
    return data;
  }

export const addEnrollment = async (enrollment: any) => {
    const { data } = await axiosWithCredentials.post(`${ENROLL_API}`, enrollment);
    return data;
  };

  export const findAllEnrollments = async () => {
    const { data } = await axiosWithCredentials.get(`${ENROLL_API}`);
    return data;
  }