import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Global/Headers/Index.js";
import ProtectedRoutes from "./components/ProtectedRoutes/UserCheck";
import ErrorPage from "./components/Global/Error";
import AdminCheck from "./components/ProtectedRoutes/AdminCheck";
import AllUsers from "./components/Admin/AllUsers";
import User from "./components/Screen/User";
import AllTasks from "./components/Screen/User/AllCourses.js";
import Home from "./components/Screen/Home";
import Login from "./components/Screen/Login";
import Register from "./components/Screen/Register";
import Cart from "./components/Screen/Cart/index.js";
import UpdateProfile from "./components/Screen/User/UpdateProfile";
import CourseSold from "./components/Admin/CourseSold.js";
import AdminHome from "./components/Screen/Home/AdminHome.js";




function App() {
  return (
    <Router>
      <Header />
      

      <Routes>
        {/* Protected routes for user */}
        <Route path="/user" element={<ProtectedRoutes />}>
          <Route path="" element={<User />} />
          <Route path="/user/mycourses" element={<AllTasks />} />
          <Route path="/user/updateProfile/:id" element={<UpdateProfile />} />
          


        </Route>
        



        {/* Protected routes for admin */}
        <Route path="/admin" element={<AdminCheck />}>
        <Route path="" element={<AdminHome />} />
          <Route path="/admin/alluser" element={<AllUsers />} />
          <Route path="/admin/soldcourses" element={<CourseSold />} />


        </Route>


        

        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
