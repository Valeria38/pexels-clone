"use client";
import { getPhotos } from "@/lib/pexels";
import { Photo } from "@/lib/types";
import { useCallback, useEffect, useRef, useState } from "react";
import MasonryGrid from "./MasonryGrid";
import Loader from "./Loader";
import { useParams } from "next/navigation";

interface IInfinitePhotoListProps {
  initialPhotos: Photo[];
}

const InfinitePhotoList = ({ initialPhotos }: IInfinitePhotoListProps) => {
  const params = useParams();
  const [photos, setPhotos] = useState(initialPhotos);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const isModalOpen = !!params.id;

  useEffect(() => {
    if (isModalOpen) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        console.log(
          "intersecting",
          entries[0].isIntersecting,
          hasMore,
          !loading,
          window.scrollY
        );
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          window.scrollY > 50
        ) {
          loadMorePhotos();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.unobserve(observerTarget.current!);
  }, [hasMore, loading, isModalOpen]);

  const loadMorePhotos = useCallback(async () => {
    setLoading(true);
    const newPhotos = await getPhotos(page);

    if (newPhotos.photos.length === 0) {
      setHasMore(false);
    } else {
      setPhotos((prev) => [...prev, ...newPhotos.photos]);
      setPage((prev) => prev + 1);
    }
    setLoading(false);
  }, [page, loading, hasMore]);

  console.log("photos", photos);

  return (
    <div className="min-h-screen">
      <MasonryGrid photos={photos} />

      {photos.length > 0 && (
        <div ref={observerTarget} className="h-10 w-full">
          {loading && <Loader />}
        </div>
      )}
    </div>
  );
};

export default InfinitePhotoList;
