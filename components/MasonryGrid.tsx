"use client";
import { Photo } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";

interface PhotosProps {
  photos: Photo[];
}

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
      {photos.map(({ alt, id, src: { original } }) => (
        <div key={id}>
          <Link href={`/${id}`}>
            <Image
              alt={alt}
              src={original}
              height={500}
              width={500}
              className="mb-4 break-inside-avoid"
            />
          </Link>
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
