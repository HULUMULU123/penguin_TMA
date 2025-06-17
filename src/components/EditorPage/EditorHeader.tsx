import { Header } from "./PhotoEditor.styles";

import update from "../../assets/icons/update.svg";
import back from "../../assets/icons/back.svg";
import cross from "../../assets/icons/cross.svg";
import { useNavigate } from "react-router-dom";
import useGlobal from "../../hooks/useGlobal";

interface EditorHeaderProps {
  active: string | null;
  setActiveFilter: (value: string | null) => void;
  setActiveInstrument: (value: string | null) => void;
  activeSave: boolean;
  notify: () => void;
  imageUrl: string;
  setCurrentImgSrc: (value: string) => void;
  localImgSrc: string;
}

export default function EditorHeader({
  active,
  setActiveFilter,
  setActiveInstrument,
  activeSave,
  notify,
  imageUrl,
  setCurrentImgSrc,
  localImgSrc,
}: EditorHeaderProps) {
  const navigate = useNavigate();
  const uploadPhoto = useGlobal((state) => state.uploadPhoto);
  const generateFileName = () => {
    const random = Math.random().toString(36).substring(2, 10);
    return `penguin_${random}.jpeg`;
  };

  const handleSave = async () => {
    try {
      // Загружаем изображение как blob
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Не удалось загрузить изображение");

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = generateFileName(); // penguin_xxxxx.jpeg
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Чистим blob URL
      URL.revokeObjectURL(blobUrl);

      if (notify) notify();
    } catch (err) {
      console.error("Ошибка при сохранении изображения:", err);
    }
  };

  return (
    <>
      <Header>
        {!active ? (
          <button
            style={{
              fontSize: 20,
              border: "none",
              background: "white",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,

              height: "34px",
            }}
            onClick={() => {
              if (activeSave) {
                uploadPhoto(imageUrl);
              }
              navigate("/photos");
            }}
          >
            <img src={cross} style={{ width: "100%", height: "100%" }} />
          </button>
        ) : (
          <button
            style={{
              fontSize: 20,
              border: "none",
              background: "white",
              fontWeight: 900,

              height: "34px",
            }}
            onClick={() => {
              setActiveFilter(null);
              setActiveInstrument(null);
              setCurrentImgSrc(localImgSrc);
            }}
          >
            <img src={back} style={{ width: "100%", height: "100%" }} />
          </button>
        )}
        Редактор фото
        <button
          style={{
            fontSize: 20,
            background: activeSave ? "#c11fbe" : "#e6a5e5",
            border: "none",
            borderRadius: "50%",
            padding: "0.4rem 0.4rem",
            display: "flex",
            alignContent: "center",
          }}
          disabled={!activeSave}
          onClick={handleSave}
        >
          <img src={update} />
        </button>
      </Header>
    </>
  );
}
