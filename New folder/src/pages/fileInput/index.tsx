import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BearPajama } from "../../components/svg";
import URL from "../../constants/domain";

const FileInputPage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const category =
      JSON.parse(localStorage.getItem("userInfo") ?? "")?.ageCategory ?? "2";
    if (file) {
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
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center">
      <div className="h-16">
        <div className=" p-2 animate-bounce ease-linear bg-white/50 rounded-full">
          <svg
            className="w-6 h-6 fill-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
        </div>
      </div>
      <div
        className="relative group p-8 bg-white shadow-md shadow-white rounded-md cursor-pointer"
        onClick={handleFileInputClick}
      >
        <BearPajama className="fill-primary group-hover:scale-105 transition-transform w-40  aspect-square" />
        <input
          type="file"
          ref={fileInputRef}
          className="absolute top-0 left-0 w-0 h-0 opacity-0"
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  );
};

export default FileInputPage;
