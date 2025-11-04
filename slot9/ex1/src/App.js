import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterPage from './pages/FooterPage';
import HomePage from './pages/HomePage';
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <div>
      <HomePage />
      <MoviePage />
      <FooterPage />
    </div>
  );
}

export default App;

