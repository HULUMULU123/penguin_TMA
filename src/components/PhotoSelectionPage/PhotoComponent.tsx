// @ts-nocheck
import React from "react";
import { Image } from "./PhotoSelectionPage.styles";
import { useLongPress } from "use-long-press";

export default function PhotoComponent({ img, onClick, onLongPress }) {
  const longPressBind = useLongPress(
    () => {
      onLongPress(img.id);
    },
    {
      threshold: 600,
      captureEvent: true,
      cancelOnMovement: true,
    }
  );

  return (
    <Image
      src={img.url}
      alt={`img-${img.id}`}
      {...longPressBind()}
      onClick={() => onClick(img.url)}
    />
  );
}
