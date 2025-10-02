import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { Menu } from "./components/Menu";
import { BookForm } from "./components/BookForm";

function App() {
  return (
    <div className="bg-dark text-light min-vh-100">
      <Header />
      <HeroSection />
      <Menu />
      <BookForm />
    </div>
  );
}

export default App;
