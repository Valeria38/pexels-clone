import { getPhoto } from "@/lib/pexels";
import Image from "next/image";
import SharePhoto from "@/components/SharePhoto";
import { UserIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import DownloadPhoto from "@/components/DownloadPhoto";
import LikeButton from "@/components/LikeButton";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

interface PhotoDetailsProps {
  params: Promise<{ id: string }>;
}
const PhotoDetails = async ({ params }: PhotoDetailsProps) => {
  const { id } = await params;
  const response = await getPhoto(id);
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guest_id")?.value;

  const { data: like } = await supabase
    .from("likes")
    .select("*")
    .eq("photo_id", id)
    .eq("user_id", guestId)
    .single();

  const ratio = response.width / response.height;
  if (!response) return null;
  return (
    <div className="min-h-screen bg-white pt-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
            <UserIcon className="text-gray-400 size-10" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
              {response.photographer}
            </span>
            <a
              href={response.photographer_url}
              target="_blank"
              className="text-xs cursor-pointer text-gray-500 hover:text-blue-600 transition-colors"
            >
              View Profile
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <LikeButton photoId={response.id} isLiked={!!like} />
          <SharePhoto url={response.url} photographer={response.photographer} />
          <DownloadPhoto
            imageUrl={response.src.original}
            filename={response.alt.split(" ").join("_")}
          />
        </div>
      </div>
      <main className="max-w-7xl mx-auto py-6 px-4">
        <div
          className="relative mx-auto bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-100"
          style={{
            maxWidth: ratio > 1 ? "1000px" : "600px",
            aspectRatio: `${ratio}`,
          }}
        >
          <Image
            src={response.src.original}
            alt={response.alt}
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-10">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <InformationCircleIcon className="text-gray-400 size-8" />
              <div>
                <h4 className="font-bold text-gray-900">Free to use</h4>
                <p className="text-gray-500 text-sm">
                  Pexels License. No attribution required.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm text-gray-600">
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-400">Dimensions</span>
              <span className="font-medium text-gray-900">
                {response.width} × {response.height}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-400">Aspect Ratio</span>
              <span className="font-medium text-gray-900">
                {ratio.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-400">Main Color</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-sm border border-gray-200"
                  style={{ backgroundColor: response.avg_color }}
                />
                <span className="font-medium text-gray-900 uppercase">
                  {response.avg_color}
                </span>
              </div>
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-400 text-sm w-full mb-2">
              Popular tags
            </span>
            {["Nature", "Wallpaper", "Background"].map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 rounded-xl text-sm text-gray-600 hover:bg-gray-200 cursor-pointer flex items-center h-fit py-2 px-4"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoDetails;
