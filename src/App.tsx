import { useEffect, useState } from "react";
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
const queryClient = new QueryClient();
// Страницы
import SplashScreen from "./pages/StartScreen";
import PhotoSelectionPage from "./pages/PhotoSelectionPage";
import EditorPage from "./pages/EditorPage";
import FilterPage from "./pages/FilterPage";
import ResultPage from "./pages/ResultPage";
// Стили
import styled, { createGlobalStyle } from "styled-components";
import Gilory from "./assets/fonts/Gilroy-Light.otf";
import Unbounded from "./assets/fonts/Unbounded-VariableFont_wght.ttf";
import useGlobal from "./hooks/useGlobal";
import Loader from "./components/Loader/Loader";
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Gilory';
    src: url(${Gilory}) format('truetype');
    font-weight: 100 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'Unbounded';
    src: url(${Unbounded}) format('truetype');
    font-weight: 100 900;
    font-style: normal;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Unbounded', sans-serif;
    background-color: #000;
    color: #fff;
    width: 100%;
    overflow-x: hidden;
  }

  /* Адаптация шрифта под маленькие экраны */
  @media (max-width: 375px) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: 320px) {
    html {
      font-size: 13px;
    }
  }
`;

// Простой Layout
const LayoutContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

function Layout() {
  return (
    <LayoutContainer>
      <Outlet /> {/* Здесь будут отображаться дочерние страницы */}
    </LayoutContainer>
  );
}

// Роуты
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <SplashScreen /> },
      { path: "photos", element: <PhotoSelectionPage /> },
      { path: "editor", element: <EditorPage /> },
      { path: "filters", element: <FilterPage /> },
      { path: "result", element: <ResultPage /> },
    ],
  },
]);

function App() {
  const webApp = useWebApp();
  const sendData = useGlobal((state) => state.sendData);
  useEffect(() => {
    if (webApp.initData) {
      sendData(webApp.initData);
    }
  }, [webApp]);
  return (
    // <QueryClientProvider client={queryClient}>
    //   <GlobalStyle />
    //   <RouterProvider router={router} />
    // </QueryClientProvider>
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
