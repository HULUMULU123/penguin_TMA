import styled from "styled-components";
import BottomSheet from "./BottomSheet"; // замените на актуальный импорт
import camera from "../assets/camera.png";
import gallery from "../assets/gallery.png";
import penguin from "../assets/penguin.png";
import {
  BottomSheetButton,
  ButtonContainer,
  HiddenFileInput,
  PenguinImage,
  PhotoPlaceholder,
  PurchaseButton,
  PurchaseContainer,
  PurchaseSubtitle,
  PurchaseText,
  PurchaseTitle,
  RecentPhotos,
  SectionSubtitle,
  SectionTitle,
} from "./PhotoSelectionPage.styles";

// Стили

const ImageUploadBottomSheet = ({
  notify,
  openFileDialog,
  handleFileUpload,
  handleClickBuyCredits,
  fileInputRef,
  webApp,
}: {
  notify: () => void;
  openFileDialog: (ref: React.RefObject<HTMLInputElement>) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickBuyCredits: (webApp: any) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  webApp: any;
}) => (
  <BottomSheet>
    <ButtonContainer>
      <BottomSheetButton onClick={notify}>
        <img src={camera} alt="Camera Icon" />
        КАМЕРА
      </BottomSheetButton>
      <BottomSheetButton onClick={() => openFileDialog(fileInputRef)}>
        <img src={gallery} alt="Gallery Icon" />
        ФОТО
      </BottomSheetButton>
      <HiddenFileInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
    </ButtonContainer>

    <div>
      <SectionTitle>Недавние</SectionTitle>
      <SectionSubtitle>
        здесь будут последние отредактированные фото
      </SectionSubtitle>
      <RecentPhotos>
        <PhotoPlaceholder />
        <PhotoPlaceholder />
        <PhotoPlaceholder />
      </RecentPhotos>

      <PurchaseContainer>
        <PenguinImage src={penguin} alt="Penguin" />
        <PurchaseText>
          <PurchaseTitle>Покупка кредитов</PurchaseTitle>
          <PurchaseSubtitle>новые генерации ждут</PurchaseSubtitle>
        </PurchaseText>
        <PurchaseButton onClick={() => handleClickBuyCredits(webApp)}>
          купить
        </PurchaseButton>
      </PurchaseContainer>
    </div>
  </BottomSheet>
);

export default ImageUploadBottomSheet;
