"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import SharePhoto from "./SharePhoto";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface IDetailsModalProps {
  src: string;
  alt: string;
  ratio: number;
  photographer: string;
}
const DetailsModal = ({ src, alt, photographer }: IDetailsModalProps) => {
  const { back } = useRouter();
  return (
    <Dialog open={true} onClose={back} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/60 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-160 min-h-160 p-4 bg-white text-black transform overflow-hidden rounded-3xl text-left shadow-2xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 sm:my-8 sm:w-full sm:max-w-md data-closed:sm:scale-95 border border-gray-100 flex flex-col gap-4 items-center justify-center"
          >
            <XMarkIcon
              width={22}
              height={22}
              className="absolute top-8 right-8 cursor-pointer text-white hover:text-gray-400 transition-colors"
              onClick={back}
            />
            <Image
              src={src}
              alt={alt}
              width={640}
              height={640}
              style={{ maxHeight: "100%", width: "auto", aspectRatio: "auto" }}
            />
            <SharePhoto url={src} photographer={photographer} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DetailsModal;
