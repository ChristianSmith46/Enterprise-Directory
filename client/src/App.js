import logo from "./logo.svg";
import "./App.css";
import EmployeeDirectory from "./components/EmployeeDirectory";
import LoginForm from "./components/LoginForm";
import { Route, Routes } from "react-router-dom";
import CreateUserForm from "./components/CreateUserForm";
import SalaryPredictor from "./components/SalaryPredictor";

function App() {
  return (
    <Routes>
      <Route path="/predictsalary" element={<SalaryPredictor />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/create" element={<CreateUserForm />} />
      <Route path="/" element={<EmployeeDirectory />} />
      <Route path="*" element={<LoginForm />} />
    </Routes>
  );
}
export default App;
