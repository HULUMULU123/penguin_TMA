// src/components/CropperWrapper.tsx

import React, { useEffect, useRef } from "react";
import Cropper from "cropperjs";

import styled from "styled-components";

interface CropperWrapperProps {
  src: string;
  onCrop: (dataUrl: string) => void;
}

const Container = styled.div`
  width: 100%;
  height: 60vh;
  overflow: hidden;
`;

function CropperWrapper(props: CropperWrapperProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    // Уничтожаем предыдущий экземпляр, если был
    if (cropperRef.current) {
      cropperRef.current.destroy();
    }

    cropperRef.current = new Cropper(imageRef.current, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 0.8,
      crop: () => {
        const canvas = cropperRef.current?.getCroppedCanvas();
        if (canvas) {
          const dataUrl = canvas.toDataURL();
          props.onCrop(dataUrl);
        }
      },
    });

    return () => {
      cropperRef.current?.destroy();
      cropperRef.current = null;
    };
  }, [props.src]);

  return (
    <Container>
      <img
        ref={imageRef}
        src={props.src}
        alt="Для обрезки"
        style={{ width: "100%", display: "block" }}
      />
    </Container>
  );
}

export default CropperWrapper;
