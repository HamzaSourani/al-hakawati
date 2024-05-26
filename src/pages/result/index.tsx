import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HomeIcon } from "../../components/svg";
import { Button } from "../../components/ui/button";

const ResultPage = () => {
  const [text, setText] = useState("");
  const [userInfo, setUserInfo] = useState<{
    isParent: "0" | "1";
    isDeaf: "0" | "1";
  } | null>(null);
  const { name } = useParams<{ name?: string }>();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
      const isParentMode = JSON.parse(userInfo).isParent;
      if (isParentMode === "1") {
        fetch(`/assets/parent/${name}.txt`)
          .then((data) => {
            return data.text();
          })
          .then((resultText) => {
            setText(resultText);
          });
      }
    }
  }, [name]);

  return (
    <div>
      <Button className="flex  items-center ms-8 mb-4" onClick={handleGoBack}>
        <HomeIcon className="w-4 ml-2 fill-white " />
        <span>رجوع إلى الرئيسية</span>
      </Button>
      <div className="flex flex-col items-center  justify-center">
        {userInfo?.isParent === "1" ? (
          <p className="py-2 overflow-auto h-[75vh]  px-8 rounded-xl  lg:text-xl  font-bold bg-white/50  backdrop-blur-sm">
            {text}
          </p>
        ) : (
          <video
            className="w-[60%]"
            src={
              userInfo?.isDeaf === "1"
                ? `/assets/deafChild/${name}.mp4`
                : `/assets/normalChild/${name}.mp4`
            }
            controls
          />
        )}
      </div>
    </div>
  );
};

export default ResultPage;
