import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./components/HeaderComponent ";
import HomePage from "./pages/HomePage";
import FooterComponent from "./components/FooterComponent";
import StorePage from "./pages/StorePage";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
        </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
