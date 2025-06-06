// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BottomSheet from "../../components/PhotoSelectionPage/BottomSheet";

import avatar from "../../assets/test_filter_1.jpg";
import avatar1 from "../../assets/test_filter_hair.jpg";
import camera from "../../assets/icons/camera.svg";
import gallery from "../../assets/icons/gallery.svg";
import penguin from "../../assets/penguin.png";
import { useNavigate } from "react-router-dom";
import useGlobal from "../../hooks/useGlobal";
import PhotoPermission from "../../components/PhotoSelectionPage/PhotoPermission";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import {
  Avatar,
  Container,
  Nickname,
  PostCount,
  UserInfo,
  Username,
  FiltersWrapper,
  FilterButton,
  Grid,
  Image,
  BottomButton,
} from "../../components/PhotoSelectionPage/PhotoSelectionPage.styles";
import {
  handleClickBuyCredits,
  handleFileUpload,
  openFileDialog,
} from "../../components/PhotoSelectionPage/helpers";
import Header from "../../components/PhotoSelectionPage/Header";
import Filters from "../../components/PhotoSelectionPage/Filters";

export const Placeholder = styled.div`
  width: calc((100% - 2 * 3px) / 3);
  aspect-ratio: 9 / 13; /* или другая пропорция под твои фото */
  background-color: #f5eaea;
  border-radius: 4px;
  pointer-events: none;
`;
// ИЗОБРАЖЕНИЯ (замени пути на свои)
const images = [
  { src: avatar, type: "faces" },
  { src: avatar, type: "selfie" },
  { src: avatar, type: "favorites" },
  { src: avatar, type: "faces" },
  { src: avatar, type: "selfie" },
  { src: avatar, type: "favorites" },
  { src: avatar, type: "faces" },
  { src: avatar, type: "selfie" },
  { src: avatar, type: "favorites" },
  { src: avatar, type: "faces" },
  { src: avatar, type: "selfie" },
  { src: avatar, type: "favorites" },
  { src: avatar1, type: "faces" },
];

export default function ProfilePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webApp = useWebApp();

  const fetchPhotos = useGlobal((state) => state.fetchPhotos);
  const photos = useGlobal((state) => state.photos);
  const uploadPhoto = useGlobal((state) => state.uploadPhoto);

  useEffect(() => {
    const permission = localStorage.getItem("photoPermission");
    setHasPermission(permission === "true");
  }, [hasPermission]);
  useEffect(() => {
    fetchPhotos();

    console.log(photos);
  }, []);

  const handleClick = (imgSrc: string) => {
    console.log("imgSrc", imgSrc);
    navigate("/editor", { state: { imgSrc } });
  };

  const notify = () => toast.error("Камера в данный момент недоступна");

  if (hasPermission === null) return <Loader />; // можно показывать лоадер
  if (!hasPermission)
    return <PhotoPermission setHasPermission={setHasPermission} />;

  return (
    <Container>
      <Header />

      {/* <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} /> */}
      {/* 
      <Grid>
        {images
          .filter((img) => activeFilter === "all" || img.type === activeFilter)
          .map((img, idx) => (
            <Image
              key={idx}
              src={img.src}
              alt={`img-${idx}`}
              onClick={() => handleClick(img.src)}
            />
          ))}
      </Grid> */}

      <Grid>
        {photos?.map((img) => (
          <Image
            key={img.id}
            src={img.url}
            alt={`img-${img.id}`}
            onClick={() => handleClick(img.url)}
          />
        ))}

        {/* Добавим заглушки */}
        {Array.from({ length: 12 - (photos?.length || 0) }).map((_, idx) => (
          <Placeholder key={`placeholder-${idx}`} />
        ))}
      </Grid>

      <BottomSheet>
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "30px",
            display: "flex",

            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",

            backgroundColor: "#fff",
            padding: "0.3rem 0.5rem",
            borderRadius: "30px",
          }}
        >
          <span style={{ color: "#000", fontSize: "11.56px" }}>Баланс</span>
          <PostCount>120</PostCount>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BottomButton onClick={notify}>
            <img src={camera} alt="Camera Icon" /> КАМЕРА
          </BottomButton>
          <BottomButton onClick={() => openFileDialog(fileInputRef)}>
            <img src={gallery} alt="Gallery Icon" /> ФОТО
          </BottomButton>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e, uploadPhoto)}
          />
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
              onClick={() => handleClickBuyCredits(webApp)}
            >
              купить
            </button>
          </div>
        </div>
      </BottomSheet>
      <Toaster
        position="top-center"
        toastOptions={
          {
            // style: {
            //   background: "rgba(193, 31, 190, 1)",
            //   padding: "0.5rem",
            //   color: "white",
            //   textAlign: "center",
            //   borderRadius: "30px",
            //   fontSize: "15px",
            // },
            // iconTheme: {
            //   primary: "white",
            //   secondary: "rgba(193, 31, 190, 1)",
            // },
          }
        }
        containerStyle={{ bottom: "10rem" }}
      />
    </Container>
  );
}
