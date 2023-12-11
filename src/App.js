import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { UserAuthProvider } from './components/Auth/AuthenticationState';
import UserLogin from './components/Auth/UserAuthentication';
import UserRegistration from './components/Auth/AccountCreation';
import UserDashboard from './components/Dashboard/PersonalDashboard';
import BudgetOverview from './components/Dashboard/FinancialSummary';
import FinancialChart from './components/Dashboard/EconomicChart';
import AddBudgetCapacity from './components/Dashboard/ExpenseCapacity';
import CreateBudget from './components/Dashboard/SetBudget';
import authService from './components/services/authService';
import './styles/style.css';
import Footer from './components/Footer/Footer';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="image-container">
        <img
          src={process.env.PUBLIC_URL + '/background_front.png'}
          alt="Budget Website Banner"
          className="background-image"
          width="1000"
          height="700"
        />
        <div className="text-overlay">
          <h1 className="welcome-message">Embark on a Journey of Financial Freedom and Empowerment</h1>
          <h2>Your Budget, Your Future!</h2>
          {/* <p className="dashboard-description">One step to your Budget Dashboard, where you can take control of your financial journey. You can:</p> */}
            <ul className="dashboard-features">
              <li>Create and manage your budgets</li>
              <li>Configure your budget settings</li>
              <li>Analyze financial charts and insights</li>
              <li>List all your budgets in one place</li>
            </ul>

          <div className="home-button-container">
            <Link to="/login" className="home-button">
              User Log In
            </Link>
            <Link to="/signup" className="home-button">
              User Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [token, setUserToken] = useState(null);
  const [isTokenRefreshModalOpen, setIsTokenRefreshModalOpen] = useState(false);

  const handleUserLogin = (token) => {
    setUserToken(token);
    setIsUserLoggedIn(true);
  };

  useEffect(() => {
    const checkUserTokenExpiry = async () => {
      if (authService.checkUserTokenExpiry()) {
        setIsTokenRefreshModalOpen(true);
      }
    };

    checkUserTokenExpiry();
  }, []);


  return (
    <Router>
      <UserAuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UserLogin onUserLogin={handleUserLogin} />} />
          <Route path="/signup" element={<UserRegistration />} />
          <Route
            path="/dashboard"
            element={isUserLoggedIn ? <UserDashboard token={token} /> : <Navigate to="/login" />}
          />
          {isUserLoggedIn && (
            <>
              <Route path="/dashboard/budget-list" element={<BudgetOverview />} />
              <Route path="/dashboard/budget-chart" element={<FinancialChart />} />
              <Route path="/dashboard/configure-budget" element={<AddBudgetCapacity />} />
              <Route path="/dashboard/add-budget" element={<CreateBudget token={token} />} />
            </>
          )}
        </Routes>
      </UserAuthProvider>
      <Footer />
    </Router>
  );
};
export default App;