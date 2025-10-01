import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Navbar } from './components/Navbar';
import { Content } from './components/Content';
import { Footer } from './components/Footer';


function App() {
  return (
    <div>
      <Navbar/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;
