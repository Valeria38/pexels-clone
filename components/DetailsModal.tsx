"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import SharePhoto from "./SharePhoto";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DownloadPhoto from "./DownloadPhoto";
import LikeButton from "./LikeButton";
import { useState } from "react";

interface IDetailsModalProps {
  src: string;
  alt: string;
  ratio: number;
  photographer: string;
  photoId: number;
  isLiked: boolean;
  width: number;
  height: number;
}
const DetailsModal = ({
  src,
  alt,
  photographer,
  photoId,
  isLiked,
  width,
  height,
}: IDetailsModalProps) => {
  const format = src.split(".")[src.split(".").length - 1];
  const { back } = useRouter();
  const [loading, setLoading] = useState(false);

  const ratio = width / height;
  return (
    <Dialog open={true} onClose={back} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/60 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className=" flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className=" relative bg-white p-7 pt-9 md:p-9 text-black overflow-hidden rounded-xl shadow-2xl transition-all sm:my-8 w-auto max-w-[98vw] flex flex-col gap-4 items-center justify-center border border-gray-100"
          >
            <XMarkIcon
              width={22}
              height={22}
              className="absolute top-2 right-2 md:top-3 md:right-3 cursor-pointer text-gray-400 hover:text-black transition-colors z-20"
              onClick={back}
            />
            <div
              style={{
                width: ratio > 1 ? "600px" : "380px",
                maxWidth: "100%",
              }}
              className={`rounded-xl w-full flex justify-center bg-gray-200 ${
                !loading ? "animate-pulse" : ""
              }`}
            >
              <Image
                onLoad={() => setLoading(true)}
                src={src}
                alt={alt}
                width={640}
                height={640}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: `${ratio}`,
                }}
                className={`rounded-xl  object-contain duration-700 ease-in-out ${
                  loading ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
            <div className="flex gap-4 w-full">
              <SharePhoto url={src} photographer={photographer} />
              <DownloadPhoto
                imageUrl={src}
                filename={`${alt.split(" ").join("_")}.${format}`}
              />
              <LikeButton photoId={photoId} isLiked={isLiked} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DetailsModal;
