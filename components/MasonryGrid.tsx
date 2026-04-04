"use client";
import { Photo } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Masonry from "react-masonry-css";

interface PhotosProps {
  photos: Photo[];
}

interface IPhotoImageProps {
  alt: string;
  src: string;
  height: number;
  width: number;
}

const PhotoImage = ({ alt, src, height, width }: IPhotoImageProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <div
      className={`relative w-full bg-gray-200 ${
        !loading ? "animate-pulse" : ""
      }`}
      style={{ aspectRatio: `${width / height}` }}
    >
      <Image
        alt={alt}
        src={src}
        onLoad={() => setLoading(true)}
        fill
        className={`duration-700 ease-in-out ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

const MasonryGrid = ({ photos }: PhotosProps) => {
  return (
    <Masonry
      breakpointCols={{
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
      }}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {photos.map(({ alt, id, src: { large }, width, height }) => (
        <div key={id}>
          <Link href={`/${id}`}>
            <PhotoImage src={large} width={width} height={height} alt={alt} />
          </Link>
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
