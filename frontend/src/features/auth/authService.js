import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "/api/users/";

//Register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

//Login user
const login = async (userData) => { console.log('wlgoos', userData);

  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log("mini", response);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// Logout user
const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  login,
  logout,
};

export default authService;
