"use client";
import { handleDownload } from "@/lib/utils";
import ArrowDownTrayIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import Button from "@/components/Button";

interface IDownloadPhotoProps {
  imageUrl: string;
  filename: string;
}

const DownloadPhoto = ({ imageUrl, filename }: IDownloadPhotoProps) => (
  <Button
    onClick={() => handleDownload(`${imageUrl}`, filename)}
    color="emerald"
    aria-label="download-photo"
  >
    <span className="sm:inline">Download</span>
    <ArrowDownTrayIcon className="size-6" role="img" />
  </Button>
);

export default DownloadPhoto;
