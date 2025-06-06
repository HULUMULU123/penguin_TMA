// src/components/PhotoGrid.tsx
// @ts-nocheck
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`;

const PhotoItem = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;

interface Photo {
  id: string;
  url: string;
}

interface PhotoGridProps {
  photos: Photo[];
  onSelect: (photo: Photo) => void;
}

function PhotoGrid(props: PhotoGridProps) {
  return (
    <GridContainer>
      {props.photos.map(function (photo) {
        return (
          <PhotoItem
            key={photo.id}
            src={photo.url}
            alt="Фото"
            onClick={function () {
              props.onSelect(photo);
            }}
          />
        );
      })}
    </GridContainer>
  );
}

export default PhotoGrid;
