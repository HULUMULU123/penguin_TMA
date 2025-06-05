import React from "react";
import { useLocation } from "react-router-dom";
import PhotoEditor from "../../components/EditorPage/PhotoEditor";
export default function EditorPage() {
  const location = useLocation();
  const imgSrc = location.state?.imgSrc;
  console.log(imgSrc);
  if (!imgSrc) {
    return <p>No image selected</p>; // или редирект на "/photos"
  }

  return <PhotoEditor src={imgSrc} />;
}
