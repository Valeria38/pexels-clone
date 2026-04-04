import DetailsModal from "@/components/DetailsModal";
import { getPhoto } from "@/lib/pexels";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";

interface IDefaultModalPageProps {
  params: Promise<{ id: string }>;
}
const DefaultModalPage = async ({ params }: IDefaultModalPageProps) => {
  const { id } = await params;
  const { src, alt, width, height, photographer } = await getPhoto(id);
  const ratio = width / height;

  const cookieStore = await cookies();
  const guestId = cookieStore.get("guest_id")?.value;

  const { data: like } = await supabase
    .from("likes")
    .select("*")
    .eq("photo_id", id)
    .eq("user_id", guestId)
    .single();

  return (
    <DetailsModal
      src={src.original}
      alt={alt}
      ratio={ratio}
      photographer={photographer}
      photoId={+id}
      isLiked={!!like}
      width={width}
      height={height}
    />
  );
};

export default DefaultModalPage;
