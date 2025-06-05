import React, { useRef } from "react";

interface FileUploaderProps {
  setTopGarment: (file: File) => void;
}

const TopGarmentUploader: React.FC<FileUploaderProps> = ({ setTopGarment }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTopGarment(file);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Выбрать файл</button>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default TopGarmentUploader;
