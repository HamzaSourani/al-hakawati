import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
const CameraInputPage = () => {
  const [open, setOpen] = useState(false);

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
        if (String(data.name) === "0") {
          setOpen(true);
        } else {
          navigate(`/result/${data.name}`);
        }
      } catch (error) {
        setOpen(true);
      }
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pt-3 text-end">
              تنبيه بيجما الحكواتية
            </DialogTitle>
            <DialogDescription>
              <p className="text-end">
                نلاحظ أنّك رفعت صورة لا تحتوي رسمة من الرسمات الموجودة ضمن
                بيجاما الحكواتية.تأكد من شراء بيجماتنا لتتمتع بخدماتنا بالكامل
              </p>
              <div className="flex gap-2 justify-center py-4">
                <img
                  src="/assets/images/pajama1.png"
                  className="w-28 aspect-square object-cover rounded-lg"
                  alt="pajama1"
                />
                <img
                  src="/assets/images/pajama2.png"
                  className="w-28 aspect-square object-cover rounded-lg"
                  alt="pajama2"
                />
                <img
                  src="/assets/images/pajama3.png"
                  className="w-28 aspect-square object-cover rounded-lg"
                  alt="pajama3"
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>لاحقا</Button>
            </DialogClose>
            <Button>اطلب الآن</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CameraInputPage;
