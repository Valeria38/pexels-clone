"use server";
import { cacheLife } from "next/cache";
import { ImageResponse, Photo } from "./types";

const headers = {
  Authorization: process.env.PEXELS_API_KEY!,
};

export async function getPhotos(page: number = 1): Promise<ImageResponse> {
  const response = await fetch(
    `https://api.pexels.com/v1/curated?page=${page}&per_page=40`,
    {
      headers,
      method: "GET",
    }
  );
  const res = await response.json();
  return res;
}

export async function getPhoto(id: string): Promise<Photo> {
  "use cache";
  cacheLife("hours");
  const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers,
    method: "GET",
  });
  const res = await response.json();

  return res;
}

export async function searchPhotos(
  query: string,
  page: number = 1
): Promise<ImageResponse> {
  "use cache";
  cacheLife("hours");
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=40&page=${page}`,
    {
      headers,
      method: "GET",
    }
  );
  return await response.json();
}
