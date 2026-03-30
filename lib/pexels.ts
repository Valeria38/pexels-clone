import { ImageResponse } from "./types";

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
