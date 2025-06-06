import { CropperButton, CropperFooterDiv } from "./PhotoEditor.styles";

interface CropperFooterProps {
  setIsCropping: (value: boolean) => void;
  getCroppedImage: () => void;
}

export default function CropperFooter({
  setIsCropping,
  getCroppedImage,
}: CropperFooterProps) {
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
