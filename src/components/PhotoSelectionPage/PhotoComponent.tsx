// @ts-nocheck
import React, { useState } from "react";
import styled from "styled-components";
import check from "../../assets/icons/check.svg";
import { useLongPress } from "use-long-press";

const ImageWrapper = styled.div`
  position: relative;
  width: calc((100% - 2 * 3px) / 3);
  margin-bottom: 0;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  user-select: none;
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
}) {
  const [isPressed, setIsPressed] = useState(false);

  const longPressBind = useLongPress(
    () => {
      setShowModalDelete(false);
      setDeletePhotoId(img.id);
      setIsPressed(true);
    },
    {
      threshold: 600,
      captureEvent: true,
      cancelOnMovement: true,
      onCancel: () => setIsPressed(false),
      onFinish: () => setIsPressed(false),
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
      {isPressed && <Overlay />}
      {isPressed && check && (
        <CheckCircle>
          <CheckImage src={check} alt="check icon" />
        </CheckCircle>
      )}
    </ImageWrapper>
  );
}
