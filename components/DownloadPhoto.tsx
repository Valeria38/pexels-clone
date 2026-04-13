"use client";
import { handleDownload } from "@/lib/utils";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

interface IDownloadPhotoProps {
  imageUrl: string;
  filename: string;
}

const DownloadPhoto = ({ imageUrl, filename }: IDownloadPhotoProps) => {
  return (
    <Button
      onClick={() => handleDownload(`${imageUrl}`, filename)}
      color="emerald"
    >
      <span className="hidden sm:inline">Download</span>
      <ArrowDownTrayIcon className="size-6" />
    </Button>
  );
};

export default DownloadPhoto;
