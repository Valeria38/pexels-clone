import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ITagProps {
  value: string;
  imgSrc: string;
}

const Tag: FC<ITagProps> = ({ value, imgSrc }) => {
  return (
    <Link key={value} href={`?query=${value}`}>
      <div className="p-1 rounded-full flex items-center gap-2 cursor-pointer">
        <div
          className="relative w-8 h-8 overflow-hidden rounded-full"
          key={value}
        >
          <Image
            src={imgSrc}
            alt={value}
            className="object-cover"
            fill
            sizes="32px"
          />
        </div>
        <p className="font-bold text-gray-500 text-sm">{value}</p>
      </div>
    </Link>
  );
};

export default Tag;
