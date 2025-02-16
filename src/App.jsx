import {BrowserRouter, Routes, Route} from "react-router-dom";
import History from './pages/History';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Login/>}/>
        <Route path = "signup" element={<SignUp/>}/>
        <Route path = "home" element={<Home/>}/>
        <Route path = "history" element={<History/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
