import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollegeList from "./components/CollegeList";
import CollegeDetails from "./components/CollegeDetails";
import Authform from "./components/Authform";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CollegeList />} />
        <Route path="/colleges" element={<CollegeList />} />
        <Route path="/college/:id" element={<CollegeDetails />} />
        <Route path="/login" element={<Authform />} />
      </Routes>
    </Router>
  );
}
export default App;
