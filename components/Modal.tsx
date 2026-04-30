import { getPhoto } from "@/lib/pexels";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import DetailsModal from "./DetailsModal";

interface IModalProps {
  params: Promise<{ id: string }>;
}

const Modal = async ({ params }: IModalProps) => {
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
      previewSrc={src.large}
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
export default Modal;
