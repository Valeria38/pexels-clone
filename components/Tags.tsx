import Tag from "./Tag";

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
        <Tag value={value} imgSrc={img} key={value} />
      ))}
    </div>
  );
};

export default Tags;
