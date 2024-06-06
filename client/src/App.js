
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './login_signup/SignUp';
import Login from './login_signup/Login';
import { UserProvider, useUser } from './Context/UserContext';
import Home from './index/Home';
import Graph0 from './Table/Graph0';
import Graph2 from './Table/Graph2';
import Graph1 from './Table/Graph1';


function App() {
  return (
    <>
      <UserProvider>
        <RouteComp />
      </UserProvider>
    </>
  );
}

function RouteComp(){

  const {user} = useUser();
  console.log(user)
  return(

    <>
      <BrowserRouter>
        <Routes>

          <Route exact path="/" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/home" element={<Home />} ></Route>
          <Route path="/graph0/:habitName/:habitId" element={<Graph0 />} ></Route>
          <Route path="/graph1/:habitName/:habitId" element={<Graph1 />}></Route>
          <Route path="/graph2/:habitName/:habitId" element={<Graph2 />}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
