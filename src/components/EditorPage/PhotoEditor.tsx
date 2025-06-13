// @ts-nocheck

import { useRef, useState, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./cropper.css";

import toast, { Toaster } from "react-hot-toast";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { EditorContainer, ImageSection } from "./PhotoEditor.styles";
import { subFilters, subInstruments } from "./photoTools";

import ToolBar from "./ToolBar";
import SubFilters from "./SubFilters";
import EditorHeader from "./EditorHeader";
import CropHeader from "./CropHeader";
import CropperFooter from "./CropperFooter";
// import RangeSlider from "./RangeSlider";
import SubInstruments from "./SubInstruments";
import useGlobal from "../../hooks/useGlobal";
import { useNavigate } from "react-router-dom";

// Типизация props
interface PhotoEditorProps {
  src: string;
}

export default function PhotoEditor({ src }: PhotoEditorProps) {
  const cropperRef = useRef<Cropper | null>(null);

  // Состояния
  const [isCropping, setIsCropping] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeInstrument, setActiveInstrument] = useState<string | null>(null);
  const [activeSave, setActiveSave] = useState(false);
  const [currentImgSrc, setCurrentImgSrc] = useState(src);
  const [activeHairStyle, setActiveHairStyle] = useState("");
  const uploadPhoto = useGlobal((state) => state.uploadPhoto);
  // Сброс изображения при смене src
  useEffect(() => {
    setCurrentImgSrc(src);
  }, [src]);

  // Уведомление об успешном сохранении
  const notify = () => toast.success("Сохранено");

  // Показывать ли тулбар (когда не кадрируем)
  const showToolBar = !isCropping;

  // Рендер хедера в зависимости от состояния
  const renderHeader = () => {
    if (showToolBar) {
      return (
        <EditorHeader
          active={activeFilter || activeInstrument}
          setActiveFilter={setActiveFilter}
          setActiveInstrument={setActiveInstrument}
          activeSave={activeSave}
          notify={notify}
          imageUrl={currentImgSrc}
        />
      );
    }
    return <CropHeader />;
  };

  const getCroppedImage = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    // Получаем обрезанное изображение как Blob
    cropper.getCroppedCanvas().toBlob(
      (blob) => {
        if (blob) {
          const croppedUrl = URL.createObjectURL(blob);
          console.log("Cropped image URL:", croppedUrl);
          setCurrentImgSrc(croppedUrl);
          setIsCropping(false);
          // например, передать в другой компонент, отправить на сервер и т.д.
          // можно также сохранить File:

          // Сохранение файла для отправки на сервер
          // const croppedFile = new File([blob], "cropped.jpg", {
          //   type: "image/jpeg",
          // });
          // console.log(croppedFile);
          // uploadPhoto(croppedFile);
          // Например: setCroppedImageFile(croppedFile)
        }
      },
      "image/jpeg",
      0.9
    ); // качество JPEG (0.9 можно изменить)
  };

  // Рендер основной секции с изображением или кадрированием
  const renderImageSection = () => (
    <ImageSection>
      {!isCropping ? (
        <TransformWrapper
          wheel={{ disabled: false }}
          pinch={{ disabled: false }}
          doubleClick={{ disabled: true }}
          panning={{ disabled: true }}
          limitToBounds
          centerOnInit
          initialScale={1}
          initialPositionY={0}
        >
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
            <img
              src={currentImgSrc}
              alt="To edit"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <Cropper
          src={currentImgSrc}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "transparent",
          }}
          initialAspectRatio={1}
          guides={false}
          viewMode={1}
          ref={cropperRef}
          background={false}
        />
      )}
    </ImageSection>
  );

  // Рендер нижнего тулбара в зависимости от активного фильтра/инструмента
  const renderBottomToolbar = () => {
    if (activeFilter && subFilters[activeFilter]?.length) {
      return (
        <SubFilters
          filterItems={subFilters[activeFilter]}
          setActiveSave={setActiveSave}
          imgSrc={currentImgSrc}
          activeFilter={activeFilter}
          setCurrentImgSrc={setCurrentImgSrc}
          setActiveHairStyle={setActiveHairStyle}
          activeHairStyle={activeHairStyle}
        />
      );
    }

    if (!showToolBar) {
      return (
        <CropperFooter
          setIsCropping={setIsCropping}
          getCroppedImage={getCroppedImage}
        />
      );
    }

    if (activeInstrument && subInstruments[activeInstrument]?.length) {
      return (
        <SubInstruments
          instrumentItems={subInstruments[activeInstrument]}
          setActiveSave={setActiveSave}
          imgSrc={currentImgSrc}
          activeInsrument={activeInstrument}
          setCurrentImgSrc={setCurrentImgSrc}
        />
      );
    }

    return (
      <ToolBar
        setActiveFilter={setActiveFilter}
        setActiveInstrument={setActiveInstrument}
        setIsCropping={setIsCropping}
        showToolBar={showToolBar}
        activeHairStyle={activeHairStyle}
      />
    );
  };

  return (
    <EditorContainer darkmode={showToolBar}>
      {renderHeader()}
      {renderImageSection()}
      {renderBottomToolbar()}

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "rgba(193, 31, 190, 1)",
            padding: "0.5rem",
            color: "white",
            textAlign: "center",
            borderRadius: "30px",
            fontSize: "15px",
          },
          iconTheme: {
            primary: "white",
            secondary: "rgba(193, 31, 190, 1)",
          },
        }}
        containerStyle={{ bottom: "10rem" }}
      />
    </EditorContainer>
  );
}
