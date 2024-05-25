import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResultPage = () => {
  const [text, setText] = useState("");
  const [userInfo, setUserInfo] = useState<{
    isParent: "0" | "1";
    isDeaf: "0" | "1";
  } | null>(null);
  const { name } = useParams<{ name?: string }>();
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
      {userInfo?.isParent === "1" ? (
        <p className="py-2 overflow-auto h-[80vh]  px-8 rounded-xl  lg:text-xl  font-bold bg-white/50  backdrop-blur-sm">
          {text}
        </p>
      ) : (
        <video
          src={
            userInfo?.isDeaf === "1"
              ? `/assets/deafChild/${name}.mp4`
              : `/assets/normalChild/${name}.mp4`
          }
          controls
        />
      )}
    </div>
  );
};

export default ResultPage;
