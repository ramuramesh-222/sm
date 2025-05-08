import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem('access');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    return null;
  }
};

export default useAuth;
