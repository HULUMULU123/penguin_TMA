// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import BottomSheet from "../PhotoSelectionPage/BottomSheet";
import {
  Toolbar,
  ButtonsGrid,
  ToolButton,
  ToolIcon,
  ToolText,
} from "./PhotoEditor.styles";
import { ButtonsFace, ButtonsInstruments } from "./photoTools";
import { SectionTitleWrapper } from "./SectionTitleWrappe";
export default function ToolBar({
  setActiveFilter,
  setActiveInstrument,
  setIsCropping,
  showToolBar,
  activeHairStyle,
}) {
  const [percents, setPercents] = useState(0);
  const [windowHeightMain, setWindowHeightMain] = useState(0);
  return (
    <BottomSheet
      peekHeightPercent={30}
      maxHeightPercent={70}
      onPositionChange={(percent) => setPercents(percent)}
      isPersistent={showToolBar}
      setWindowHeightMain={setWindowHeightMain}
    >
      <Toolbar>
        <SectionTitleWrapper opacity={percents}>
          Фильтры лица
        </SectionTitleWrapper>
        <ButtonsGrid>
          {ButtonsFace.map((item) => {
            const isDisabled = item.key === "haircolor" && !activeHairStyle;

            return (
              <ToolButton
                key={item.name}
                onClick={() => {
                  if (!isDisabled) {
                    setActiveFilter(item.key);
                    console.log(item.key);
                  }
                }}
                style={{
                  opacity: isDisabled ? 0.5 : 1,
                  pointerEvents: isDisabled ? "none" : "auto",
                  backgroundColor: isDisabled ? "#ccc" : "transparent",
                }}
              >
                <ToolIcon>
                  <img src={item.src} alt={item.name} />
                </ToolIcon>
                <ToolText>{item.name}</ToolText>
              </ToolButton>
            );
          })}
        </ButtonsGrid>
        <SectionTitleWrapper opacity={percents}>
          Инструменты
        </SectionTitleWrapper>
        <ButtonsGrid>
          {ButtonsInstruments.map((item) =>
            item.key === "crop" ? (
              <ToolButton key={item.name} onClick={() => setIsCropping(true)}>
                <ToolIcon>
                  <img src={item.src} alt={item.name} />
                </ToolIcon>
                <ToolText>{item.name}</ToolText>
              </ToolButton>
            ) : (
              <ToolButton
                key={item.name}
                onClick={() => setActiveInstrument(item.key)}
              >
                <ToolIcon>
                  <img src={item.src} alt={item.name} />
                </ToolIcon>
                <ToolText>{item.name}</ToolText>
              </ToolButton>
            )
          )}
        </ButtonsGrid>
      </Toolbar>
    </BottomSheet>
  );
}
