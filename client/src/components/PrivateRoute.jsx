import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Adjust your auth logic as needed
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;