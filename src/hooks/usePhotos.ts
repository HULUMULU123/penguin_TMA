// src/hooks/usePhotos.ts
// import { useQuery } from "@tanstack/react-query";

// export interface Photo {
//   id: string;
//   url: string;
//   name: string;
//   category: string;
// }

// async function fetchPhotos(): Promise<Photo[]> {
//   const response = await fetch("https://api.example.com/photos");
//   if (!response.ok) {
//     throw new Error("Не удалось загрузить фото");
//   }
//   return response.json();
// }

// function usePhotos() {
//   return useQuery<Photo[], Error>({
//     queryKey: ["photos"],
//     queryFn: fetchPhotos,
//   });
// }

// export default usePhotos;
