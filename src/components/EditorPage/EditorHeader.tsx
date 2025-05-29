import React from "react";
import { Header } from "./PhotoEditor.styles";

import update from "../../assets/icons/update.svg";
import back from "../../assets/icons/back.svg";
import cross from "../../assets/icons/cross.svg";
import { useNavigate } from "react-router-dom";
export default function EditorHeader({
  active,
  setActiveFilter,
  setActiveInstrument,
  activeSave,
  notify,
}) {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        {!active ? (
          <button
            style={{
              fontSize: 20,
              border: "none",
              background: "white",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,

              height: "34px",
            }}
            onClick={() => {
              navigate("/photos");
            }}
          >
            <img src={cross} style={{ width: "100%", height: "100%" }} />
          </button>
        ) : (
          <button
            style={{
              fontSize: 20,
              border: "none",
              background: "white",
              fontWeight: 900,

              height: "34px",
            }}
            onClick={() => {
              setActiveFilter(null);
              setActiveInstrument(null);
            }}
          >
            <img src={back} style={{ width: "100%", height: "100%" }} />
          </button>
        )}
        Редактор фото
        <button
          style={{
            fontSize: 20,
            background: activeSave ? "#c11fbe" : "#e6a5e5",
            border: "none",
            borderRadius: "50%",
            padding: "0.4rem 0.4rem",
            display: "flex",
            alignContent: "center",
          }}
          disabled={!activeSave}
          onClick={notify}
        >
          <img src={update} />
        </button>
      </Header>
    </>
  );
}
