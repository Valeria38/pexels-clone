"use client";
import { supabase } from "@/lib/supabase";
import { HeartIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

interface ILikeButtonProps {
  photoId: number;
  isLiked: boolean;
}

const LikeButton = ({ photoId, isLiked }: ILikeButtonProps) => {
  const [liked, setLiked] = useState(isLiked);
  const toggleLike = async (e: React.MouseEvent) => {
    const guestId = localStorage.getItem("guest_id") || crypto.randomUUID();
    localStorage.setItem("guest_id", guestId);
    document.cookie = `guest_id=${guestId}; path=/; max-age=31536000`;

    const nextState = !liked;
    setLiked(nextState);

    if (nextState) {
      await supabase
        .from("likes")
        .insert({ photo_id: photoId, user_id: guestId });
    } else {
      await supabase
        .from("likes")
        .delete()
        .eq("photo_id", photoId)
        .eq("user_id", guestId);
    }
  };
  return (
    <button
      onClick={toggleLike}
      className={`sm:flex cursor-pointer p-3 border border-gray-200 hover:bg-gray-100 rounded-xl transition-colors`}
    >
      <HeartIcon
        className={`size-6 ${
          liked ? "text-red-500" : "text-white stroke-gray-400 stroke-2"
        }`}
      />
    </button>
  );
};

export default LikeButton;
