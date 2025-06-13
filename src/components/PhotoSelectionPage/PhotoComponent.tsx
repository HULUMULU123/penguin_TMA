// @ts-nocheck
import React, { useState } from "react";
import { Image } from "./PhotoSelectionPage.styles";
import { useLongPress } from "use-long-press";
import { useNavigate } from "react-router-dom";
import useGlobal from "../../hooks/useGlobal";

export default function PhotoComponent({ img }) {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deletePhotoId, setDeletePhotoId] = useState(null);
  const navigate = useNavigate();
  const deletePhoto = useGlobal((state) => state.deletePhoto);
  const longPressBind = useLongPress(
    () => {
      setShowModalDelete(true);
      console.log("long press");
    },
    {
      threshold: 600, // сколько мс удерживать (0.6 секунды)
      captureEvent: true,
      cancelOnMovement: true,
    }
  );
  const handleDelete = (photoId) => {
    deletePhoto(photoId);
    setShowModalDelete(false);
  };
  const handleClick = (imgSrc: string) => {
    console.log("imgSrc", imgSrc);
    navigate("/editor", { state: { imgSrc } });
  };
  return (
    <>
      <Image
        key={img.id}
        src={img.url}
        alt={`img-${img.id}`}
        {...longPressBind()}
        onClick={() => handleClick(img.url)}
      />
      {showModalDelete && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 10,
              minWidth: 200,
            }}
          >
            <p>Удалить фото?</p>
            <button onClick={() => handleDelete(img.id)}>Удалить</button>
            <button onClick={() => setShowModalDelete(false)}>Отмена</button>
          </div>
        </div>
      )}
    </>
  );
}
