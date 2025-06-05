import React, { useEffect, useRef, useState } from "react";
import BottomSheet from "../PhotoSelectionPage/BottomSheet";
import {
  Toolbar,
  SectionTitle,
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
}) {
  const [percents, setPercents] = useState(0);

  return (
    <BottomSheet
      peekHeightPercent={30}
      maxHeightPercent={80}
      onPositionChange={(percent) => setPercents(percent)}
      isPersistent={showToolBar}
    >
      <Toolbar>
        <SectionTitleWrapper opacity={percents}>
          Фильтры лица
        </SectionTitleWrapper>
        <ButtonsGrid>
          {ButtonsFace.map((item) => (
            <ToolButton
              key={item.name}
              onClick={() => {
                setActiveFilter(item.key);
                console.log(item.key);
              }}
            >
              <ToolIcon>
                <img src={item.src} alt={item.name} />
              </ToolIcon>
              <ToolText>{item.name}</ToolText>
            </ToolButton>
          ))}
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
