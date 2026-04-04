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
      className="bg-[#05a081] hover:bg-[#048a6f] shadow-md text-white rounded-xl font-semibold transition-all flex items-center gap-2.5 px-4 py-2 cursor-pointer"
    >
      <span className="hidden sm:inline">Download</span>
      <ArrowDownTrayIcon className="size-6" />
    </button>
  );
};

export default DownloadPhoto;
