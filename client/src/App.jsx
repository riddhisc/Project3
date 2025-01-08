
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Register from './pages/Register';
import theme from './theme.jsx';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/jobs" element={<Jobs />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
