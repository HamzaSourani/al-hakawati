import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";
import { Button } from "../../components/ui/button";
const CameraInputPage = () => {
  const webcamRef = React.useRef<Webcam>(null!);
  const navigate = useNavigate();

  const dataURLtoFile = (dataUrl: string | null, filename: string) => {
    if (!dataUrl) {
      return;
    }
    let temp = dataUrl.split(","),
      mime = temp[0].match(/:(.*?);/)?.[1],
      bstr = atob(temp[1]),
      index = bstr.length,
      unit8Array = new Uint8Array(index);

    while (index--) {
      unit8Array[index] = bstr.charCodeAt(index);
    }

    return new File([unit8Array], filename, { type: mime });
  };

  const capture = React.useCallback(() => {
    if (!webcamRef) {
      return;
    }
    const image = webcamRef.current.getScreenshot();
    const category =
      JSON.parse(localStorage.getItem("userInfo") ?? "")?.ageCategory ?? "2";
    let imgFile = dataURLtoFile(image, "client.jpg");
    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result as string;
      const formData = new FormData();
      formData.append("image", base64String.slice(22));
      formData.append("category", category);
      try {
        const { data } = await axios.post(`${URL}/receive_story`, formData);
        navigate(`/result/${data.name}`);
      } catch (error) {}
    };
    reader.readAsDataURL(imgFile!);
  }, [webcamRef, navigate]);

  return (
    <div className="flex flex-col items-center gap-8  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center">
      <Webcam
        className="rounded-md w-80  border border-border"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <Button onClick={capture}>إلتقاط الصورة</Button>
    </div>
  );
};

export default CameraInputPage;
