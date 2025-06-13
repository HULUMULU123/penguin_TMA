// @ts-nocheck
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
  const gradientStyle = {
    background: `linear-gradient(
      50deg,
      rgba(241, 47, 92, 1) 0%,
      rgba(173, 42, 163, 1) 63%,
      rgba(72, 22, 218, 1) 100%
    )`,
    borderRadius: "4px",
    height: "3px",
    display: "inline-block",
  };
  return (
    <StyledHeader>
      <Avatar src={userData?.photo_url} alt="avatar" />
      <UserInfo>
        <Username>
          {userData?.first_name || ""} {userData?.last_name || ""}
        </Username>
        <Nickname>@{userData?.username || "неизвестный"}</Nickname>
      </UserInfo>
      {/* <PostCount>{userData?.count_generations}</PostCount> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "4px",
        }}
      >
        <span style={{ ...gradientStyle, width: "30px" }}></span>
        <span style={{ ...gradientStyle, width: "20px" }}></span>
      </div>
    </StyledHeader>
  );
}
