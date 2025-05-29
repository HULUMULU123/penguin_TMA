import React from "react";
import { Header } from "./PhotoEditor.styles";
export default function CropHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
      }}
    >
      <p style={{ fontSize: "23px", fontWeight: "500" }}>Обрезать</p>
    </div>
  );
}
