import React from "react";
import { CropperButton, CropperFooterDiv } from "./PhotoEditor.styles";

export default function CropperFooter({ setIsCropping, getCroppedImage }) {
  return (
    <CropperFooterDiv>
      <CropperButton saveBtn={false} onClick={() => setIsCropping(false)}>
        Отмена
      </CropperButton>
      <CropperButton saveBtn={true} onClick={getCroppedImage}>
        Сохранить
      </CropperButton>
    </CropperFooterDiv>
  );
}
