import Registration from './Components/EmployeeRegistration';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/HomePage';
import LoginPage from './Components/Login';
import EmployeeTechnology from './Components/SkillRating'
import EmployeeData from './Components/AllEmployees';
import Registration1 from './Components/EmpRegistration';
import SearchPage from './Components/SearchEmployeeByAdmin';
import AdminLogin from './Components/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/registration1" component={Registration1} />
          <Route path="/adminLogin" component={AdminLogin} />
          <Route path="/login" component={LoginPage } />
          <Route path="/registration" component={Registration} />
          <Route path="/skillsofemp" component={EmployeeTechnology} />
          <Route path="/searchbyemployee" component={EmployeeData} />
          <Route path="/searchEmpByAdmin" component={SearchPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
