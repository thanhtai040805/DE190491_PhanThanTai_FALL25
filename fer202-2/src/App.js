import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<LoginForm />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
