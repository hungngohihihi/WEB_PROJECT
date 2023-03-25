import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../../components/Admin//HeaderAdmin/HeaderAdmin";
import NavAdmin from "../../components/Admin//NavAdmin/NavAdmin";

import { Outlet } from "react-router-dom";


const Admin = ({adminToken}) => {
  const navigate = useNavigate();
  if (!adminToken) {
    navigate("/AdminLogin");
  }
  return (
    <div>

      <Outlet context={adminToken}/>
      <HeaderAdmin></HeaderAdmin>
      <NavAdmin></NavAdmin>
    </div>
  );
};
export default Admin;
