import { toast } from "sonner";

export const copyLink = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);

    toast.success("Copied!");
  } catch (err) {
    toast.error(`Unable to copy: ${err}`);
  }
};

export const handleDownload = async (imageUrl: string, filename: string) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
