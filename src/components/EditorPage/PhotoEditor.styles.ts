import styled from "styled-components";

export const EditorContainer = styled.div<{ darkmode: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${(props) => (props.darkmode ? "#fff" : "#000")};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  color: black;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: bold;
`;

export const ImageSection = styled.div`
  flex: 0 0 auto; /* больше не тянется */
  width: 100vw;
  height: 80vh;
  margin: 0 auto;
  background: white;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.div`
  background: white;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 16px 12px;
`;

export const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const HandleBar = styled.div`
  width: 40px;
  height: 4px;
  background: black;
  border-radius: 2px;
  margin: 12px auto 0;
`;

// Обёртка для секции
export const FaceFiltersSection = styled.div`
  padding: 20px;
`;

// Заголовок
export const SectionTitle = styled.h4<{ opacity: number }>`
  color: #000;
  font-family: "Unbounded", sans-serif;
  font-weight: 500;
  font-size: 15px;
  margin-bottom: ${(props) => (props.opacity / 100) * 2}rem;
  margin-left: 0.5rem;
  opacity: ${(props) => props.opacity / 100};
  transition: opacity 0.05s ease-in-out;
`;

// Сетка с кнопками
export const ButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

// Каждая кнопка
export const ToolButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  font-family: "Gilroy", sans-serif;
  font-size: 14px;
  color: #000;
  transition: transform 0.2s;
`;

// Иконка
export const ToolIcon = styled.div`
  width: 50px;
  height: 50px;
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ToolText = styled.p`
  font-family: "Unbounded", sans-serif;
  font-size: 12px;
  margin: 1rem 0;
`;

// ===============SubFilters====================

export const SubFiltersList = styled.ul`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 1rem 0.5rem 1rem; /* отступы слева и справа */
  width: 100%;
  box-sizing: border-box;

  /* Скрытие стандартного скролла */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

export const SubFilterItem = styled.li`
  flex: 0 0 auto; /* Не сжимается */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubFilterImg = styled.img<{ active: boolean }>`
  border-radius: 20px;
  border: 2px solid
    ${(props) => (props.active ? "rgba(193, 31, 190, 1)" : "transparent")};
`;

export const SubInstrumentImg = styled.div<{ active: boolean }>`
  border-radius: 20px;
  width: 5rem;
  height: 6.5rem;
  background: #fff;
  border: 2px solid
    ${(props) => (props.active ? "rgba(193, 31, 190, 1)" : "transparent")};
`;

export const SubFilterSpan = styled.span`
  margin-top: 1rem;
  font-size: 10px;
  color: #000;
`;

export const BottomWrapper = styled.div`
  position: fixed; /* если ты хочешь привязать к низу экрана */
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
  z-index: 1000;
`;

// ===============SelectVariation================
export const SelectVariationWrapper = styled.div`
  margin: 0;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.1rem;
  border-radius: 20px;
`;

export const VariationList = styled.ul`
  list-style: none;
  margin: 0;
  display: flex;

  gap: 1rem;
  padding: 0;
`;

export const VariationItem = styled.li<{ active: boolean }>`
  padding: 0.25rem 0.6rem;
  border-radius: 50%;
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.3)"};
  color: ${(props) =>
    props.active ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 0.42)"};
`;

// ===========CropperFooter================

export const CropperFooterDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: auto;
`;

export const CropperButton = styled.button<{ saveBtn: boolean }>`
  color: ${(props) => (props.saveBtn ? "#fff" : "rgba(255, 255, 255, 0.58)")};
  font-size: 16px;
  font-weight: 500;
  background: transparent;
  border: none;
`;
