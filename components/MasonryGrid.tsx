"use client";
import { Photo } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import Loader from "./Loader";

interface PhotosProps {
  photos: Photo[];
}

interface IPhotoImageProps {
  alt: string;
  src: string;
  height: number;
  width: number;
  priority: boolean;
}

export const PhotoImage = ({
  alt,
  src,
  height,
  width,
  priority,
}: IPhotoImageProps) => {
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
        priority={priority}
        sizes="(max-width: 568px) 100vw, (max-width: 768px) 33.3vw, (max-width: 1200px) 25vw, 100vw"
        className={`duration-700 ease-in-out ${
          loading ? "opacity-100" : "opacity-0"
        } `}
      />
    </div>
  );
};

const MasonryGrid = ({ photos }: PhotosProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <Loader />;
  return (
    <Masonry
      breakpointCols={{
        default: 4,
        1439: 3,
        1199: 2,
        767: 1,
      }}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {photos.map(({ alt, id, src: { large }, width, height }, idx) => (
        <div key={id}>
          <Link href={`/${id}`} scroll={false}>
            <PhotoImage
              priority={idx < 10}
              src={large}
              width={width}
              height={height}
              alt={alt}
            />
          </Link>
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
