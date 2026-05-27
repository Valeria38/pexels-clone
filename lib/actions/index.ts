"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function toggleLikeAction(
  photoId: number,
  shouldLike: boolean,
  guestId?: string,

) {
  const supabase = await createClient();
  if (shouldLike) {
    const { error } = await supabase
      .from("likes")
      .insert({ photo_id: photoId, user_id: guestId });
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("photo_id", photoId)
      .eq("user_id", guestId);
    if (error) throw new Error(error.message);
  }

  revalidatePath(`/${photoId}`);
}
