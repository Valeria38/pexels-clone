import Image from "next/image";
import Link from "next/link";

const popularTags = [
  { value: "wallpaper", img: "/wallpaper.avif" },
  { value: "background", img: "/background.avif" },
  { value: "flowers", img: "/flowers.avif" },
  { value: "landscape", img: "/landscape.avif" },
  { value: "dog", img: "/dog.avif" },
  { value: "cat", img: "/cat.avif" },
  { value: "sunset", img: "/sunset.avif" },
  { value: "beach", img: "/beach.avif" },
  { value: "mountain", img: "/mountain.avif" },
  { value: "texture", img: "/texture.avif" },
];

const Tags = () => {
  return (
    <div className="mb-8 p-2 flex justify-between items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-amber-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-amber-400 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-amber-500">
      {popularTags.map(({ value, img }) => (
        <Link key={value} href={`?query=${value}`}>
          <div className="p-1 rounded-full flex items-center gap-2 cursor-pointer">
            <div
              className="relative w-8 h-8 overflow-hidden rounded-full"
              key={value}
            >
              <Image
                src={img}
                alt={value}
                className="object-cover"
                fill
                sizes="32px"
              />
            </div>
            <p className="font-bold text-gray-500 text-sm">{value}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Tags;
