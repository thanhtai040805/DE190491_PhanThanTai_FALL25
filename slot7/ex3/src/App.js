import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Banner from "./component/Banner";
import Navbar from "./component/Navbar";
import { Hero } from "./component/Hero";
import { Footer } from "./component/Footer";

function App() {
  return (
    <div>
      <Banner />
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
