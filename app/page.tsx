import { getPhotos } from "@/lib/pexels";
import MasonryGrid from "@/components/MasonryGrid";

export default async function Home() {
  const { photos } = await getPhotos();
  return (
    <section className="w-full px-7.5">
      <h1 className="font-serif text-3xl font-bold text-gray-700">Photos</h1>
      {photos && <MasonryGrid photos={photos} />}
    </section>
  );
}
