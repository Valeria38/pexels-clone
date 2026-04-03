import { getPhotos } from "@/lib/pexels";
import MasonryGrid from "@/components/MasonryGrid";

export default async function Home() {
  const { photos } = await getPhotos();

  return (
    <section className="w-full px-7.5">
      {photos && <MasonryGrid photos={photos} />}
    </section>
  );
}
