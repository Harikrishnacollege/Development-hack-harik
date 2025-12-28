import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollegeList from "./components/CollegeList";
import CollegeDetails from "./components/CollegeDetails";
import Home from "./Pages/Home";
import Authform from "./components/Authform";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colleges" element={<CollegeList />} />
        <Route path="/college/:id" element={<CollegeDetails />} />
        <Route path="/login" element={<Authform />} />
      </Routes>
    </Router>
  );
}
export default App;
