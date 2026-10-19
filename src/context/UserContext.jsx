
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "../main";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Send OTP to the user's email
  async function loginUser(email, navigate) {
    setBtnLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/user/login`,
        { email }
      );

      toast.success(data.message);

      // No verification JWT is required
      localStorage.removeItem("verifyToken");

      // Save email temporarily for OTP verification
      sessionStorage.setItem("otpEmail", email);

      navigate("/verify");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to send OTP"
      );
    } finally {
      setBtnLoading(false);
    }
  }

  // Verify OTP and log in the user
  async function verifyUser(otp, navigate, fetchChats) {
    const email = sessionStorage.getItem("otpEmail");

    if (!email) {
      toast.error("Please enter your email again");
      navigate("/login");
      return;
    }

    setBtnLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/user/verify`,
        {
          email,
          otp,
        }
      );

      toast.success(data.message);

      // Remove temporary email
      sessionStorage.removeItem("otpEmail");

      // Store the actual login JWT
      localStorage.setItem("token", data.token);

      setIsAuth(true);
      setUser(data.user);

      navigate("/");

      await fetchChats();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setBtnLoading(false);
    }
  }

  // Fetch authenticated user's profile
  async function fetchUser() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/me`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setIsAuth(true);
      setUser(data);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  // Log out the user
  const logoutHandler = (navigate) => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("otpEmail");

    toast.success("Logged out");
    setIsAuth(false);
    setUser([]);
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        btnLoading,
        isAuth,
        setIsAuth,
        user,
        verifyUser,
        loading,
        logoutHandler,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
