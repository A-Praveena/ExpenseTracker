// import './App.css';
import React ,{ ReactDOM , useEffect} from 'react';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
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



function App() {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  return (
    // <div className="App">
    //     <Form></Form>
    // </div>
    <BrowserRouter>
      <Routes>

      <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/Dashboard/:userId" element={<Dashboard/>}></Route>
        <Route path="/ExpenseForm/:userId" element={<ExpenseForm/>}></Route>
        <Route path="/AboutUs" element={<AboutUs/>}></Route>
        <Route path="/Contact" element={<Contact/>}></Route>
        <Route path="/DoughnutChart" element={<DoughnutChart/>}></Route>
        <Route path="/ExpenseCard" element={<ExpenseCard/>}></Route>
        <Route path="/HomeDashboard" element={<HomeDashboard/>}></Route>

        
      </Routes>
      </BrowserRouter>
  );
}

export default App;