"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function toggleLikeAction(
  photoId: number,
  guestId: string,
  shouldLike: boolean
) {
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
}
