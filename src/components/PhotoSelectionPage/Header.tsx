import React from "react";
import {
  Avatar,
  Container,
  Nickname,
  PostCount,
  UserInfo,
  Username,
  StyledHeader,
  FiltersWrapper,
  FilterButton,
  Grid,
  Image,
  BottomButton,
} from "../../components/PhotoSelectionPage/PhotoSelectionPage.styles";
import useGlobal from "../../hooks/useGlobal";
export default function Header() {
  const userData = useGlobal((state) => state.userData);
  return (
    <StyledHeader>
      <Avatar src={userData?.photo_url} alt="avatar" />
      <UserInfo>
        <Username>{`${userData?.first_name} ${userData?.last_name}`}</Username>
        <Nickname>@{userData?.username}</Nickname>
      </UserInfo>
      <PostCount>120</PostCount>
    </StyledHeader>
  );
}
