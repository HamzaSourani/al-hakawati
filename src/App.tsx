import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import bg from "./assets/bg.png";
import { Button } from "./components/ui/button";
function App() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
  };
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
      <div className=" m-auto">
        <header className="flex shadow-lg justify-between items-center py-2   px-8    bg-white/50  backdrop-blur-sm  mb-4">
          <Button onClick={handleLogout}>تسجيل خروج</Button>
          <div className="   ">
            <img
              className="w-16 rounded-md aspect-square object-cover "
              src="/assets/images/logo.png"
              alt="al hakawati"
            />
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
