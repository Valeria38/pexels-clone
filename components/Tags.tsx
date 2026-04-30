import Tag from "./Tag";
import wallpapaerSrc from "@/assets/wallpaper.avif";
import bgSrc from "@/assets/background.avif";
import flowersSrc from "@/assets/flowers.avif";
import landscapeSrc from "@/assets/landscape.avif";
import dogSrc from "@/assets/dog.avif";
import catSrc from "@/assets/cat.avif";
import sunsetSrc from "@/assets/sunset.avif";
import beachSrc from "@/assets/beach.avif";
import mountainSrc from "@/assets/mountain.avif";
import textureSrc from "@/assets/texture.avif";

const popularTags = [
  { value: "wallpaper", img: wallpapaerSrc },
  { value: "background", img: bgSrc },
  { value: "flowers", img: flowersSrc },
  { value: "landscape", img: landscapeSrc },
  { value: "dog", img: dogSrc },
  { value: "cat", img: catSrc },
  { value: "sunset", img: sunsetSrc },
  { value: "beach", img: beachSrc },
  { value: "mountain", img: mountainSrc },
  { value: "texture", img: textureSrc },
];

const Tags = () => {
  return (
    <div className="mb-8 p-2 flex justify-between items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-amber-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-amber-400 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-amber-500">
      {popularTags.map(({ value, img }) => (
        <Tag value={value} imgSrc={img} key={value} />
      ))}
    </div>
  );
};

export default Tags;
