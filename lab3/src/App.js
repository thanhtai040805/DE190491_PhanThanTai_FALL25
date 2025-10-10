import "bootstrap/dist/css/bootstrap.min.css";
import FooterPage from "./pages/FooterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { AccountPage } from "./pages/AccountPage.jsx";
import MoviePage from "./pages/MoviePage.jsx";

function App() {
  return (
    <div>
      <HomePage />
      <MoviePage />
      <AccountPage />
      <FooterPage />
    </div>
  );
}

export default App;
