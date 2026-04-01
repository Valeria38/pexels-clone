import { ImageResponse, Photo } from "./types";

const headers = {
  Authorization: process.env.PEXELS_API_KEY!,
};

export async function getPhotos(): Promise<ImageResponse> {
  const response = await fetch(
    `https://api.pexels.com/v1/curated?page=1&per_page=40`,
    {
      headers,
      method: "GET",
    }
  );
  return await response.json();
}

export async function getPhoto(id: string): Promise<Photo> {
  const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers,
    method: "GET",
  });
  return await response.json();
}
