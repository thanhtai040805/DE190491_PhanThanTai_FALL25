import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import SignUp from './components/SignUp';
import { SearchAccount } from './components/SearchAccount';

function App() {
  return (
    <div>
      <CounterComponent />
      <LightSwitch />
      <LoginForm />
      <LoginForm2 />
      <SearchItem />
      <SearchAccount />
      <SignUp />
    </div>
  );
}

export default App;
