"use client";
import { searchPhotos } from "@/lib/pexels";
import { Photo } from "@/lib/types";
import { useCallback, useEffect, useRef, useState } from "react";
import MasonryGrid from "./MasonryGrid";
import Loader from "./Loader";
import { useParams, useSearchParams } from "next/navigation";

interface IInfinitePhotoListProps {
  initialPhotos: Photo[];
}

const InfinitePhotoList = ({ initialPhotos }: IInfinitePhotoListProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const params = useParams();
  const [photos, setPhotos] = useState(initialPhotos);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const isModalOpen = !!params.id;

  const loadMorePhotos = useCallback(async () => {
    if (query) {
      setLoading(true);
      const newPhotos = await searchPhotos(query, page);

      if (newPhotos.photos.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prev) => {
          const uniqueNewPhotos = newPhotos.photos.filter(
            (newPhoto) => !prev.some((existing) => existing.id === newPhoto.id)
          );
          return [...prev, ...uniqueNewPhotos];
        });
        setPage((prev) => prev + 1);
      }
      setLoading(false);
    }
  }, [page, query]);

  useEffect(() => {
    if (isModalOpen) return;

    const observer = new IntersectionObserver(
      async (entries) => {
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

    return () => observer.disconnect();
  }, [hasMore, isModalOpen, loading, loadMorePhotos]);

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
