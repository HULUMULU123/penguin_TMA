import React, { useRef, useState } from "react";
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
import RangeSlider from "./RangeSlider";
import SubInstruments from "./SubInstruments";

// Типизация props и состояний
interface PhotoEditorProps {
  src: string;
}

export default function PhotoEditor({ src }: PhotoEditorProps) {
  const cropperRef = useRef<Cropper | null>(null);

  const [isCropping, setIsCropping] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeInstrument, setActiveInstrument] = useState<string | null>(null);
  const [activeSave, setActiveSave] = useState(false);

  const notify = () => toast.success("Сохранено");
  const showToolBar = !isCropping;

  const renderHeader = () =>
    showToolBar ? (
      <EditorHeader
        active={activeFilter || activeInstrument}
        setActiveFilter={setActiveFilter}
        setActiveInstrument={setActiveInstrument}
        activeSave={activeSave}
        notify={notify}
      />
    ) : (
      <CropHeader />
    );

  const renderImageSection = () => (
    <ImageSection>
      {!isCropping ? (
        <TransformWrapper
          wheel={{ step: 0.1 }}
          pinch={{ disabled: false }}
          doubleClick={{ disabled: true }}
          limitToBounds
          centerOnInit
          initialScale={2}
        >
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
            <img
              src={src}
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
          src={src}
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

  const renderBottomToolbar = () => {
    if (subFilters[activeFilter]?.length) {
      return (
        <SubFilters
          filterItems={subFilters[activeFilter]}
          setActiveSave={setActiveSave}
        />
      );
    }

    if (!showToolBar) {
      return <CropperFooter setIsCropping={setIsCropping} />;
    }

    if (subInstruments[activeInstrument]?.length) {
      return (
        <SubInstruments instrumentItems={subInstruments[activeInstrument]} />
      );
    }

    return (
      <ToolBar
        setActiveFilter={setActiveFilter}
        setActiveInstrument={setActiveInstrument}
        setIsCropping={setIsCropping}
        showToolBar={showToolBar}
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
