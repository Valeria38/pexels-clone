import Link from "next/link";
import Image from "next/image";
import { getPhotos } from "@/lib/pexels";

export default async function Home() {
  const { photos } = await getPhotos();
  return (
    <section className="mt-12 flex justify-center">
      <div className="container">
        <h1 className="font-serif text-3xl font-bold text-gray-700">Photos</h1>

        <ul className="mt-10 grid mx-6 auto-rows-max grid-cols-1 gap-6 sm:mx-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {photos.length &&
            photos.map(({ alt, id, src: { original } }) => (
              <li key={id}>
                {/* <Link href={small}> */}
                <Image
                  alt={alt}
                  src={original}
                  height={500}
                  width={500}
                  className="aspect-square w-full rounded-xl object-cover"
                />
                {/* </Link> */}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
