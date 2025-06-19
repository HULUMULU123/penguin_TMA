// @ts-nocheck
import React, { useState } from "react";
import styled from "styled-components";
import check from "../../assets/icons/check.svg";
import { useLongPress } from "use-long-press";

const ImageWrapper = styled.div`
  position: relative;

  margin-bottom: 0;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  border-radius: 4px;
`;

const Overlay = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.2);
`;

const CheckCircle = styled.div`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckImage = styled.img`
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1); /* если нужно, чтобы сделать иконку белой */
`;

export default function PhotoComponent({
  img,
  handleClick,
  setDeletePhotoId,
  setShowModalDelete,
  setIsPressed,
  isPressed,
}) {
  // const [isPressed, setIsPressed] = useState(null);

  const longPressBind = useLongPress(
    () => {
      setShowModalDelete(false);
      setDeletePhotoId(img.id);
      setIsPressed(img.id);
    },
    {
      threshold: 600,
      captureEvent: true,
      cancelOnMovement: true,
    }
  );

  return (
    <ImageWrapper {...longPressBind()}>
      <StyledImage
        src={img.url}
        alt={`img-${img.id}`}
        onClick={() => handleClick(img.url)}
        draggable={false}
      />
      {isPressed === img.id && <Overlay />}
      {isPressed === img.id && check && (
        <CheckCircle>
          <CheckImage src={check} alt="check icon" />
        </CheckCircle>
      )}
    </ImageWrapper>
  );
}
