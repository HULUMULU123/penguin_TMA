// @ts-nocheck
import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 17px;
`;

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  flex-grow: 1;
`;

export const Username = styled.h1`
  font-size: 14.72px;
  font-weight: 500;
  margin: 0;
  color: #010b00;
`;

export const Nickname = styled.p`
  font-size: 11.56px;
  color: gray;
  margin: 0;
`;

export const PostCount = styled.div`
  background: #f12f5c;
  background: linear-gradient(
    50deg,
    rgba(241, 47, 92, 1) 0%,
    rgba(173, 42, 163, 1) 63%,
    rgba(72, 22, 218, 1) 100%
  );
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 14.5px;
  border-radius: 24px;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 16px;
  overflow-x: auto;
  margin-top: 8px;
  /* Скрываем скроллбар */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const FilterButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1.5px solid;
  font-size: 14px;
  white-space: nowrap;
  color: #c11fbe;
  font-weight: 800;
  ${({ active }) =>
    active
      ? `
    background-color: #fbe7fa;
    border-color: #fbe7fa;
    
  `
      : `
    background-color: white;
    border-color: #e1c2df;
    
  `}
`;

export const Grid = styled.div`
  margin-top: 0.2rem;
  /* display: flex; */
  flex-wrap: wrap;
  gap: 2.19px;
  padding: 0px;
  flex-grow: 0;
  padding-bottom: 15rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const Image = styled.img`
  width: calc((100% - 2 * 3px) / 3); // 3 колонки, 2 промежутка
  height: auto; // сохраняет естественную высоту
  object-fit: cover; // обрезает, но не растягивает
  margin-bottom: 0px;
`;

export const BottomBar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background-color: white;
  border-top: 1px solid #eee;
`;

export const BottomButton = styled.button`
  background-color: #c11fbe;
  color: white;
  font-weight: bold;
  /* width: 48%; */
  width: 100%;
  padding: 1rem 0;
  border-radius: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  border: none;
  justify-content: center;
  font-weight: 800;
  font-family: "Unbounded", sans-serif;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const SectionTitle = styled.h3`
  color: #000;
  font-weight: 500;
  font-size: 15px;
  margin: 2rem 0 0.5rem 0;
`;

export const SectionSubtitle = styled.p`
  color: rgba(34, 34, 34, 0.58);
  font-size: 10px;
  margin: 0;
`;

export const RecentPhotos = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const PhotoPlaceholder = styled.div`
  background-color: rgba(245, 245, 245, 1);
  width: 113px;
  height: 113px;
  border-radius: 15px;
`;

export const PurchaseContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  background: #fbe7fa;
  border-radius: 20px;
  padding: 1.7rem 1.5rem;
  justify-content: space-between;
  position: relative;
`;

export const PenguinImage = styled.img`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 33px;
  height: 33px;
  border-radius: 50%;
`;

export const PurchaseText = styled.div``;

export const PurchaseTitle = styled.h4`
  color: rgba(1, 11, 0, 1);
  font-size: 14px;
  margin: 0.25rem 0;
`;

export const PurchaseSubtitle = styled.p`
  color: rgba(34, 34, 34, 0.58);
  font-size: 11px;
  margin: 0;
`;

export const PurchaseButton = styled.button`
  background: #fff;
  color: rgba(193, 31, 190, 1);
  border-radius: 20px;
  font-size: 12px;
  font-family: "Unbounded", sans-serif;
  border: none;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  font-weight: 800;
`;

export const BottomSheetButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
