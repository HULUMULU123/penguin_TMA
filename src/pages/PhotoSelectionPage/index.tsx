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
import { useLongPress } from "use-long-press";
import PhotoComponent from "../../components/PhotoSelectionPage/PhotoComponent";
export const Placeholder = styled.div`
  width: calc((100% - 2 * 3px) / 3);
  aspect-ratio: 9 / 13; /* или другая пропорция под твои фото */
  background-color: #f5eaea;
  border-radius: 4px;
  pointer-events: none;
`;

export const PhotoPlaceholder = styled.div`
  background-color: rgba(245, 245, 245, 1);
  width: 113px;
  height: 113px;
  border-radius: 15px;
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
  const deletePhoto = useGlobal((state) => state.deletePhoto);
  const photos = useGlobal((state) => state.photos);
  const uploadPhoto = useGlobal((state) => state.uploadPhoto);
  const userData = useGlobal((state) => state.userData);
  const [windowHeight, setWindowHeight] = useState(0);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deletePhotoId, setDeletePhotoId] = useState(null);
  const [isPressedPhoto, setIsPressedPhoto] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef(null);
  const handleDelete = (photoId) => {
    deletePhoto(photoId);
    setShowModalDelete(false);
  };
  useEffect(() => {
    const permission = localStorage.getItem("photoPermission");
    setHasPermission(permission === "true");
  }, [hasPermission]);
  useEffect(() => {
    fetchPhotos();
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
    console.log(photos);
  }, [userData]);

  const handleClick = (imgSrc: string) => {
    console.log("imgSrc", imgSrc);
    navigate("/editor", { state: { imgSrc } });
  };

  const notify = () => toast.error("Камера в данный момент недоступна");

  if (hasPermission === null || !userData) return <Loader />; // можно показывать лоадер
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
      {isPressedPhoto && (
        <div
          ref={ref}
          style={{
            display: "flex",
            width: "100vw",
            height: "3rem",
            position: isSticky ? "fixed" : "relative",
            background: "#fff6fd",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "1rem",
              display: "flex",
              gap: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <button
              style={{
                padding: "0.5rem 0.75rem",
                color: "white",
                borderRadius: "100px",
                border: "none",
                background: "rgba(239, 63, 66, 1)",
                fontSize: "12px",
                fontFamily: "Unbounded, sans-serif",
              }}
              onClick={() => setShowModalDelete(true)}
            >
              Удалить
            </button>
            <button
              style={{
                padding: "0.25rem 0.5rem",
                color: "white",
                borderRadius: "100px",
                border: "none",
                background: "rgba(255, 255, 255, 1)",
                fontSize: "12px",
                fontFamily: "Unbounded, sans-serif",
                color: "black",
              }}
              onClick={() => setIsPressedPhoto(null)}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
      <Grid>
        {photos?.map((img) => (
          <>
            <PhotoComponent
              img={img}
              setDeletePhotoId={setDeletePhotoId}
              handeClick={handleClick}
              setShowModalDelete={setShowModalDelete}
              setIsPressed={setIsPressedPhoto}
              isPressed={isPressedPhoto}
            />
            {/* <Image
                key={img.id}
                src={img.url}
                alt={`img-${img.id}`}
                {...longPressBind(img.id)}
                onClick={() => handleClick(img.url)}
              /> */}
            {showModalDelete && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    padding: 20,
                    borderRadius: 10,
                    minWidth: 200,
                  }}
                >
                  <p>Удалить фото?</p>
                  <button onClick={() => handleDelete(deletePhotoId)}>
                    Удалить
                  </button>
                  <button onClick={() => setShowModalDelete(false)}>
                    Отмена
                  </button>
                </div>
              </div>
            )}
          </>
        ))}

        {/* Добавим заглушки */}
        {Array.from({ length: 12 - (photos?.length || 0) }).map((_, idx) => (
          <Placeholder key={`placeholder-${idx}`} />
        ))}
      </Grid>

      <BottomSheet
        peekHeightPercent={20}
        maxHeightPercent={70}
        setWindowHeightMain={setWindowHeight}
      >
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
          <PostCount>
            {typeof userData?.count_generations === "number"
              ? userData.count_generations
              : 0}
          </PostCount>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            touchAction: "none",
          }}
        >
          {/* <BottomButton onClick={notify}>
            <img src={camera} alt="Camera Icon" /> КАМЕРА
          </BottomButton> */}
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
        <div style={{ opacity: windowHeight / 100 }}>
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
            {photos.slice(0, 3).map((photo, index) => (
              <img
                key={photo.id || index}
                src={photo.url || photo.image || photo}
                alt={`Recent photo ${index + 1}`}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  marginRight: 8,
                  borderRadius: "15px",
                }}
                onClick={() => handleClick(photo.url || photo.image || photo)}
              />
            ))}

            {/* Если фото меньше 3, показываем placeholder'ы на оставшиеся места */}
            {Array.from({
              length: 3 - photos.length > 0 ? 3 - photos.length : 0,
            }).map((_, idx) => (
              <PhotoPlaceholder key={`placeholder-${idx}`} />
            ))}
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
