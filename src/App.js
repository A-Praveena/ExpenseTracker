// import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './login/login';
import Dashboard from './dashboard/dashboard';
import Register from './register/register';
import LandingPage from './LandingPage/LandingPage';
import ExpenseForm from './ExpenseForm/ExpenseForm';
import AboutUs from './about/about';
import Contact from './Contact/contact';
import DoughnutChart from './Components/Doughnut/Doughnut';
import ExpenseCard from './Components/ExpenseCard/ExpenseCard';
import HomeDashboard from './HomeDashboard/Homedashboard';
import AddIncome from './addincome/addincome';
import StackedAreas from './Components/StackedAreas/stackedAreas'
import Profile from './Profile/profile';
import EditProfile from './editProfile/editProfile';
import Daily from './Components/Daily/Daily';
import PasswordChange from './Password/password';
import Analysis from './Analysis/Analysis';
import EditExpenseModal from './editModal/EditModal';
import NotFound from './Notfound/Notfound';
import PrivateRoute from './ProtectedRoute/PrivateRoute';



function App() {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        

        <Route element={<PrivateRoute/>}>

        
        <Route path="/Dashboard/:userId" element={<Dashboard />}></Route>
        <Route path="/ExpenseForm/:userId" element={<ExpenseForm />}></Route>
        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/DoughnutChart" element={<DoughnutChart />}></Route>
        <Route path="/ExpenseCard" element={<ExpenseCard />}></Route>
        <Route path="/HomeDashboard" element={<HomeDashboard />}></Route>
        <Route path="/AddIncome/:userId" element={<AddIncome />}></Route>
        <Route path='/StackedAreas' element={<StackedAreas />}></Route>
        <Route path='/Profile' element={<Profile />}></Route>
        <Route path='/EditProfile:userId' element={<EditProfile />}></Route>
        <Route path='/Daily:userId' element={<Daily />}></Route>
        <Route path='/PasswordChange:userId' element={<PasswordChange />}></Route>
        <Route path='/Analysis:userId' element={<Analysis />}></Route>
        <Route path='/EditExpenseModal:userId' element={<EditExpenseModal />}></Route>




          </Route>
        <Route path='*' element={<NotFound/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;