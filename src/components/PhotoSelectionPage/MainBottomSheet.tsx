// @ts-nocheck
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
import useGlobal from "../../hooks/useGlobal";

// Стили

const ImageUploadBottomSheet = ({
  openFileDialog,
  handleFileUpload,
  handleClickBuyCredits,
  fileInputRef,
  webApp,
}: {
  openFileDialog: (ref: React.RefObject<HTMLInputElement>) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickBuyCredits: (webApp: any) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  webApp: any;
}) => {
  const photos = useGlobal((state) => state.photos);
  console.log(photos, "test photossss");
  return (
    <BottomSheet>
      <ButtonContainer>
        {/* <BottomSheetButton onClick={notify}>
        <img src={camera} alt="Camera Icon" />
        КАМЕРА
      </BottomSheetButton> */}
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
          {photos.slice(0, 3).map((photo, index) => (
            <img
              key={photo.id || index}
              src={photo.url || photo.image || photo}
              alt={`Recent photo ${index + 1}`}
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                marginRight: 8,
              }}
            />
          ))}

          {/* Если фото меньше 3, показываем placeholder'ы на оставшиеся места */}
          {Array.from({
            length: 3 - photos.length > 0 ? 3 - photos.length : 0,
          }).map((_, idx) => (
            <PhotoPlaceholder key={`placeholder-${idx}`} />
          ))}
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
};
export default ImageUploadBottomSheet;
