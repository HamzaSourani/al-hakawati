import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import bg from "./assets/bg.png";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
function App() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };
  useEffect(() => {
    if (!!!localStorage.getItem("userInfo")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="h-screen  overflow-hidden bg-red-300 bg-blend-hard-light bg-contain  bg-center"
    >
      <div className=" m-auto">
        <header className="flex shadow-lg justify-between items-center py-2   px-8    bg-white/50  backdrop-blur-sm  mb-4">
          <div className="   ">
            <img
              className="w-16 rounded-md aspect-square object-cover "
              src="/assets/images/logo.png"
              alt="al hakawati"
            />
          </div>
          {localStorage.getItem("userInfo") && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>تسجيل الخروج</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="pt-3 text-end">
                    تسجيل الخروج من بيجاما الحكواتية{" "}
                  </DialogTitle>
                  <DialogDescription>
                    <p className="text-end">
                      هل أنت متأدك من رغبتك بتسجيل الخروج من بيجاما الحكواتية
                    </p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant={"outline"}>رجوع</Button>
                  </DialogClose>
                  <Button onClick={handleLogout}>تسجيل الخروج</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </header>
        <div className="flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
