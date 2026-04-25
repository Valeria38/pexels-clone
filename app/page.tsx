import { searchPhotos } from "@/lib/pexels";
import InfinitePhotoList from "@/components/InfinitePhotoList";
import SearchBar from "@/components/SearchBar";
import Tags from "@/components/Tags";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { query } = await searchParams;
  if (!query) {
    redirect("/?query=nature");
  }
  const { photos } = await searchPhotos(query, 1);

  return (
    <section className="w-full px-3 md:px-7.5">
      <SearchBar initialQuery={query} />
      <Tags />
      {photos && <InfinitePhotoList initialPhotos={photos} key={query} />}
    </section>
  );
}
