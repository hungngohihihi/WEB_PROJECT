import { Routes, Route } from "react-router-dom";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import Home from "./page/Home/Home";
import ListEpisode from "./page/ListEpisode/ListEpisode";
import { useEffect, useState } from "react";
import WatchFilm from "./page/WatchFilm/WatchFilm";
import AdminLogin from "./page/AdminLogin/AdminLogin";
import ChangePassword from "./page/ChangePassword/ChangePassword";
import Admin from "./page/Admin/Admin";
import HomeAdmin from "./page/Admin/HomeAdmin/HomeAdmin";
import AddFilmAdmin from "./page/Admin/FilmAdmin/AddFilmAdmin";
import AddEpisodeAdmin from "./page/Admin/FilmAdmin/AddEpisodeFilm"
import ListFilmAdmin from "./page/Admin/FilmAdmin/ListFilmAdmin";
import ListAccountAdmin from "./page/Admin/Account/ListAccountAdmin";
import ListAccountUser from "./page/Admin/Account/ListAccountUser";
import AddAccountAdmin from "./page/Admin/Account/AddAccountAdmin"

function App() {
  const [user, setUser] = useState();
  const [adminToken, setAdminToken] = useState();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const signUp = () => {
    const user = {
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      avatar: localStorage.getItem("avatar"),
    }
    setUser(user);
  }
  const adminLogin = () => {
    setAdminToken(localStorage.getItem("adminToken"));
  }
  useEffect(() => {
    signUp();
  }, [isSignUp]);
  useEffect(() => {
    adminLogin();
  },[isAdminLogin]);
  return (
    <Routes>
      <Route path="/" element={<Home user={user} setIsSignUp={setIsSignUp} />} />
      <Route path="/:page" element={<Home user={user} setIsSignUp={setIsSignUp} />} />
      <Route path="/ListEpisode" element={<ListEpisode user={user} setIsSignUp={setIsSignUp} />} />
      <Route path="/ListEpisode/:filmName" element={<ListEpisode user={user} setIsSignUp={setIsSignUp} />} />
      <Route path="/WatchFilm/:filmName" element={<WatchFilm user={user} setIsSignUp={setIsSignUp} />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/AdminLogin" element={<AdminLogin setIsAdminLogin={setIsAdminLogin}/>} />
      <Route path="/Admin" element={<Admin adminToken = {adminToken}/>} >
        <Route path="Home" element={<HomeAdmin />}></Route>
        <Route path="AddFilm" element={<AddFilmAdmin />}></Route>
        <Route path="AddEpisodeFilm" element={<AddEpisodeAdmin />}></Route>
        <Route path="ListFilm/:page" element={<ListFilmAdmin />}></Route>
        <Route path="ListFilm" element={<ListFilmAdmin />}></Route>
        <Route path="ListAccountAdmin" element={<ListAccountAdmin />}></Route>
        <Route path="ListAccountUser" element={<ListAccountUser />}></Route>
        <Route path="AddAccountAdmin" element={<AddAccountAdmin />}></Route>
      </Route>
      <Route path="/ChangePassword" element={<ChangePassword />} />
      <Route path="/Login" element={<Login setIsSignUp={setIsSignUp} />} />
    </Routes>
  );
}

export default App;
