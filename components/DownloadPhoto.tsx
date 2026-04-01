"use client";
import { handleDownload } from "@/lib/utils";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface IDownloadPhotoProps {
  imageUrl: string;
  filename: string;
}

const DownloadPhoto = ({ imageUrl, filename }: IDownloadPhotoProps) => {
  return (
    <button
      onClick={() => handleDownload(`${imageUrl}`, filename)}
      className="bg-[#05a081] hover:bg-[#048a6f] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold transition-all flex items-center gap-2"
    >
      <span className="hidden sm:inline">Free Download</span>
      <ArrowDownTrayIcon className="size-8" />
    </button>
  );
};

export default DownloadPhoto;
