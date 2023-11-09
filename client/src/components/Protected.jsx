import { useRef } from "react";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Protected = () => {
  const location = useLocation();
  const gert = useRef(location.state?.isGert);
  {
    gert.current ? localStorage.setItem("deEchteGertGeheim", true) : null;
  }
  const [admin, setAdmin] = useState(localStorage.getItem("deEchteGertGeheim"));
  return admin ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
