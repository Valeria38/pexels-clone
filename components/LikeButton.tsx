"use client";
import HeartIcon from "@heroicons/react/24/solid/HeartIcon";
import React, { useState } from "react";
import Button from "./Button";
import { toggleLikeAction } from "@/lib/actions";

interface ILikeButtonProps {
  photoId: number;
  isLiked: boolean;
}

const LikeButton = ({ photoId, isLiked }: ILikeButtonProps) => {
  const [liked, setLiked] = useState(isLiked);

  const toggleLike = async () => {
    const guestId = localStorage.getItem("guest_id") || crypto.randomUUID();
    localStorage.setItem("guest_id", guestId);
    const nextState = !liked;
    setLiked(nextState);

    try {
      await toggleLikeAction(photoId, guestId, nextState);
    } catch (error) {
      setLiked(!nextState);
      console.error("Failed to toggle like", error);
    }
  };

  return (
    <Button onClick={toggleLike} color="gray" className="md:px-3">
      <HeartIcon
        className={`size-6 ${
          liked ? "text-red-500" : "text-white stroke-gray-400 stroke-2"
        }`}
      />
    </Button>
  );
};

export default LikeButton;
