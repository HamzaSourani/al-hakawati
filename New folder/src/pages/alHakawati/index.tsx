import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";

const AlHakawatiPage = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="flex justify-center  items-center gap-8">
        <Link to={"camera-input"}>
          <Button
            className="text-xl py-2 px-4"
            variant={
              pathname === "/al-hakawati/camera-input" ? "default" : "outline"
            }
          >
            إلتقاط صورة من الكميرا
          </Button>
        </Link>
        <Link to={"file-input"}>
          <Button
            className="text-xl py-2 px-4"
            variant={
              pathname === "/al-hakawati/file-input" ? "default" : "outline"
            }
          >
            تحميل صورة من الحاسوب
          </Button>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AlHakawatiPage;
