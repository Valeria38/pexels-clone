"use client";
import { ShareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { copyLink } from "@/lib/utils";
import Copy from "@/assets/copy.svg";

interface SharePhotoProps {
  url: string;
  photographer: string;
}

const iconsData = (url: string) => [
  {
    url: `https://www.threads.net/intent/post?text=${encodeURIComponent(url)}`,
    src: `/threads.svg`,
    alt: "Threads icon",
  },
  {
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    src: `/linkedin.svg`,
    alt: "LinkedIn icon",
  },
  {
    url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    src: `/facebook.svg`,
    alt: "Facebook icon",
  },
  {
    url: `https://x.com/intent/post?url=${url}`,
    src: `/x.svg`,
    alt: "X icon",
  },
];
const SharePhoto = ({ url, photographer }: SharePhotoProps) => {
  const [opened, setOpened] = useState(false);
  const pathname = usePathname();

  const toggleModal = () => {
    setOpened(!opened);
  };
  const displayValue = `Photo by ${photographer}`;
  return (
    <>
      <div>
        <button
          onClick={toggleModal}
          className="cursor-pointer flex items-center gap-2.5 rounded-xl px-5 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95"
        >
          <ShareIcon className="size-8" />
          Share
        </button>

        <Dialog open={opened} onClose={setOpened} className="relative z-50">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/60 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <DialogPanel
                transition
                className="relative bg-white text-black transform overflow-hidden rounded-3xl text-left shadow-2xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 sm:my-8 sm:w-full sm:max-w-md data-closed:sm:scale-95 border border-gray-100"
              >
                <XMarkIcon
                  width={22}
                  height={22}
                  className="absolute top-5 right-5 cursor-pointer text-gray-400 hover:text-gray-900 transition-colors"
                  onClick={toggleModal}
                />

                <div className="px-8 pt-10 pb-6 border-b border-gray-100">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-bold text-gray-950 text-center"
                  >
                    Share this with your community
                  </DialogTitle>
                </div>

                <div className="flex justify-center items-center gap-6 my-10 px-8">
                  {iconsData(url).map(({ src, alt, url }) => (
                    <a
                      key={alt}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-50 rounded-full border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all group"
                      title={`Share on ${alt}`}
                    >
                      <Image
                        src={src}
                        alt={alt}
                        width={32}
                        height={32}
                        className="group-hover:scale-105 transition-transform"
                      />
                    </a>
                  ))}
                </div>

                <div className="mt-6 px-8 mb-10">
                  <label className="text-gray-600 text-sm mb-3 block font-medium">
                    Add a link to this photo
                  </label>

                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 group">
                    <span className="text-gray-950 truncate font-medium text-sm select-all">
                      {displayValue}
                    </span>

                    <button
                      onClick={() =>
                        copyLink(`${window.location.origin}${pathname}`)
                      }
                      className="ml-3 p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all active:scale-95"
                      title="Copy link to clipboard"
                    >
                      <Copy size={18} className="cursor-pointer" />
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default SharePhoto;
