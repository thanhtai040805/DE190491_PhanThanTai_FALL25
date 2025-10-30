import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import MovieManager from "./pages/MovieManager";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/movie" element={<MovieManager />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
