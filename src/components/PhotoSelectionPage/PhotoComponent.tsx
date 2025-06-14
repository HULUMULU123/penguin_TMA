// @ts-nocheck
import React from "react";
import { Image } from "./PhotoSelectionPage.styles";
import { useLongPress } from "use-long-press";

export default function PhotoComponent({ img, handleClick, setDeletePhotoId }) {
  const longPressBind = useLongPress(
    () => {
      setDeletePhotoId(img.id);
    },
    {
      threshold: 600,
      captureEvent: true,
      cancelOnMovement: true,
    }
  );

  return (
    <>
      <Image
        key={img.id}
        src={img.url}
        alt={`img-${img.id}`}
        {...longPressBind()}
        onClick={() => handleClick(img.url)}
      />
      {/* {showModalDelete && (
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
            <button onClick={() => handleDelete(deletePhotoId)}>Удалить</button>
            <button onClick={() => setShowModalDelete(false)}>Отмена</button>
          </div>
        </div>
      )} */}
    </>
  );
}
