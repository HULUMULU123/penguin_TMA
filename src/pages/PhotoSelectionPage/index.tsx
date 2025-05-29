import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BottomSheet from "../../components/PhotoSelectionPage/BottomSheet";

import avatar from "../../assets/avatar.png";
import camera from "../../assets/icons/camera.svg";
import gallery from "../../assets/icons/gallery.svg";
import penguin from "../../assets/penguin.png";
import { useNavigate } from "react-router-dom";
import useGlobal from "../../hooks/useGlobal";
import PhotoPermission from "../../components/PhotoSelectionPage/PhotoPermission";
import Loader from "../../components/Loader/Loader";
// ФИЛЬТРЫ
const filters = ["ЛИЦА", "ИЗБРАННОЕ", "СЕЛФИ", "ВСЕ"];

// ИЗОБРАЖЕНИЯ (замени пути на свои)
const images = [avatar, avatar, avatar, avatar, avatar, avatar, avatar];

const Container = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;

const UserInfo = styled.div`
  flex-grow: 1;
`;

const Username = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: #010b00;
`;

const Nickname = styled.p`
  font-size: 14px;
  color: gray;
  margin: 0;
`;

const PostCount = styled.div`
  background: #f12f5c;
  background: linear-gradient(
    50deg,
    rgba(241, 47, 92, 1) 0%,
    rgba(173, 42, 163, 1) 63%,
    rgba(72, 22, 218, 1) 100%
  );
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 24px;
`;

const FiltersWrapper = styled.div`
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

const FilterButton = styled.button<{ active: boolean }>`
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

const Grid = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  padding: 0px;
  flex-grow: 0;
`;

const Image = styled.img`
  width: calc((100% - 2 * 3px) / 3); // 2 gaps по 2px между 3 колонками
  margin-bottom: 0px;
  height: calc((100% - 2 * 3px) / 3);
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background-color: white;
  border-top: 1px solid #eee;
`;

const BottomButton = styled.button`
  background-color: #c11fbe;
  color: white;
  font-weight: bold;
  width: 48%;
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

export default function ProfilePage() {
  const [activeFilter, setActiveFilter] = useState("ВСЕ");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const userData = useGlobal((state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const permission = localStorage.getItem("photoPermission");
      setHasPermission(permission === "true");
    }, 3000);
  }, [hasPermission]);

  const handleClick = (imgSrc: string) => {
    navigate("/editor", { state: { imgSrc } });
  };

  if (hasPermission === null) return <Loader />; // можно показывать лоадер
  if (!hasPermission)
    return <PhotoPermission setHasPermission={setHasPermission} />;

  return (
    <Container>
      <Header>
        <Avatar src={userData?.photo_url} alt="avatar" />
        <UserInfo>
          <Username>{`${userData?.first_name} ${userData?.last_name}`}</Username>
          <Nickname>@{userData?.username}</Nickname>
        </UserInfo>
        <PostCount>120</PostCount>
      </Header>

      <FiltersWrapper>
        {filters.map((f) => (
          <FilterButton
            key={f}
            active={f === activeFilter}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </FilterButton>
        ))}
      </FiltersWrapper>

      <Grid>
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`img-${idx}`}
            onClick={() => handleClick(img)}
          />
        ))}
        {/* Пустые ячейки */}
        {Array.from({ length: 9 - images.length }).map((_, idx) => (
          <div key={idx}></div>
        ))}
      </Grid>
      <BottomSheet>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BottomButton>
            <img src={camera} alt="Camera Icon" /> КАМЕРА
          </BottomButton>
          <BottomButton>
            <img src={gallery} alt="Camera Icon" /> ФОТО
          </BottomButton>
        </div>
        <div>
          <h3
            style={{
              color: "#000",
              fontWeight: 500,
              fontSize: 15,
              margin: " 2rem 0 .5rem 0",
            }}
          >
            Недавние
          </h3>
          <p
            style={{ color: "rgba(34, 34, 34, 0.58)", fontSize: 10, margin: 0 }}
          >
            здесь будут последние отредактированные фото
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(245, 245, 245, 1)",
                width: "113px",
                height: "113px",
                borderRadius: "15px",
              }}
            ></div>
            <div
              style={{
                backgroundColor: "rgba(245, 245, 245, 1)",
                width: "113px",
                height: "113px",
                borderRadius: "15px",
              }}
            ></div>
            <div
              style={{
                backgroundColor: "rgba(245, 245, 245, 1)",
                width: "113px",
                height: "113px",
                borderRadius: "15px",
              }}
            ></div>
          </div>
          <div
            style={{
              marginTop: "4rem",
              display: "flex",
              background: "#fbe7fa",
              borderRadius: "20px",
              padding: "1.7rem 1.5rem",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <img
              style={{
                position: "absolute",
                top: "-15px",
                left: "50%",
                transform: "translateX: -50%",
                width: "33px",
                height: "33px",
                borderRadius: "50%",
              }}
              src={penguin}
            />
            <div>
              <h4
                style={{
                  color: "rgba(1, 11, 0, 1)",
                  fontSize: "14px",
                  margin: "0.25rem 0",
                }}
              >
                Покупка кредитов
              </h4>
              <p
                style={{
                  color: "rgba(34, 34, 34, 0.58)",
                  margin: 0,
                  fontSize: "11px",
                }}
              >
                новые генерации ждут
              </p>
            </div>
            <button
              style={{
                background: "#fff",
                color: "rgba(193, 31, 190, 1)",
                borderRadius: "20px",
                fontSize: "12px",
                fontFamily: "Unbounded, sans-serif",
                border: "none",
                padding: ".5rem 1rem",
                textTransform: "uppercase",
                fontWeight: "800",
              }}
            >
              купить
            </button>
          </div>
        </div>
      </BottomSheet>
    </Container>
  );
}
