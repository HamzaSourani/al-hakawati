import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import bg from "./assets/bg.png";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!!!localStorage.getItem("userInfo")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="h-screen overflow-hidden bg-red-300 bg-blend-hard-light bg-contain  bg-center"
    >
      <div className="max-w-[1200px] m-auto">
        <header className="py-4 px-12">
          <h1 className="  py-2 -skew-x-12  px-8 rounded-xl text-xl md:text-2xl  lg:text-3xl font-bold bg-white/50  backdrop-blur-sm ">
            الحكواتية{" "}
          </h1>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
