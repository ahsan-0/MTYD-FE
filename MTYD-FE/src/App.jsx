import "./App.css";
import ThreeDimensionalGame from "./components/ThreeDimensionalGame";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path="/3dgame" element={<ThreeDimensionalGame />}/>
      </Routes>
    </div>
  );
}


export default App;