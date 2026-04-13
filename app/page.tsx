import { getPhotos } from "@/lib/pexels";
import InfinitePhotoList from "@/components/InfinitePhotoList";
import SearchBar from "@/components/SearchBar";

export default async function Home() {
  const { photos } = await getPhotos();

  return (
    <section className="w-full px-7.5">
      {photos && (
        <>
          <SearchBar />
          <InfinitePhotoList initialPhotos={photos} />
        </>
      )}
    </section>
  );
}
