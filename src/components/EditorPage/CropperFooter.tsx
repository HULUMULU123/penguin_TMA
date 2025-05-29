import React from "react";
import { CropperButton, CropperFooterDiv } from "./PhotoEditor.styles";

export default function CropperFooter({ setIsCropping }) {
  return (
    <CropperFooterDiv>
      <CropperButton saveBtn={false} onClick={() => setIsCropping(false)}>
        Отмена
      </CropperButton>
      <CropperButton saveBtn={true}>Сохранить</CropperButton>
    </CropperFooterDiv>
  );
}
