"use client";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
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
import Button from "./Button";
import copyUrl from "@/assets/copy.svg";
import threadsUrl from "@/assets/threads.svg";
import linkedinUrl from "@/assets/linkedin.svg";
import fbUrl from "@/assets/facebook.svg";
import xUrl from "@/assets/x.svg";

interface SharePhotoProps {
  url: string;
  photographer: string;
}

const iconsData = (url: string) => [
  {
    url: `https://www.threads.net/intent/post?text=${encodeURIComponent(url)}`,
    src: threadsUrl,
    alt: "Threads icon",
  },
  {
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    src: linkedinUrl,
    alt: "LinkedIn icon",
  },
  {
    url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    src: fbUrl,
    alt: "Facebook icon",
  },
  {
    url: `https://x.com/intent/post?url=${url}`,
    src: xUrl,
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
      <Button onClick={toggleModal}>
        Share
        <ShareIcon className="size-6" />
      </Button>

      <Dialog open={opened} onClose={setOpened} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/60 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-3 md:p-4 text-center sm:p-0">
            <DialogPanel
              transition
              className="relative bg-white text-black transform overflow-hidden rounded-xl text-left shadow-2xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 sm:my-8 sm:w-full sm:max-w-md data-closed:sm:scale-95 border border-gray-100"
            >
              <XMarkIcon
                className="absolute size-5  lg:size-7 top-2 right-2 md:top-3 md:right-3 cursor-pointer text-gray-400 hover:text-gray-900 transition-colors"
                onClick={toggleModal}
              />

              <div className="px-4 pt-10 pb-6 border-b border-gray-100">
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
                    title={`Share on ${alt}`}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      sizes="24px"
                      className="group-hover:scale-105 transition-transform"
                    />
                  </a>
                ))}
              </div>

              <div className="mt-6 px-4 mb-10">
                <label className="text-gray-600 text-sm mb-3 block font-medium">
                  Add a link to this photo
                </label>

                <div className="w-full p-2 md:p-2.5 flex items-center justify-between bg-gray-50 rounded-xl border border-gray-100 group">
                  <span className="text-gray-950 truncate font-medium text-sm select-all">
                    {displayValue}
                  </span>

                  <Button
                    onClick={() =>
                      copyLink(`${window.location.origin}${pathname}`)
                    }
                    className="ml-3 md:px-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all active:scale-95"
                    title="Copy link to clipboard"
                  >
                    <Image
                      src={copyUrl}
                      className="cursor-pointer size-5 md:size-6"
                      alt="Copy icon"
                      sizes="20"
                    />
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SharePhoto;
